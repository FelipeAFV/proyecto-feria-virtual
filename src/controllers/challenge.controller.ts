import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { Challenge } from "../model/entity/Challenge";
import { ChallengeComplete } from "../model/entity/ChallengeComplete";
import { Profile } from "../model/entity/Profile";


class ChallengeController {

    isChallengeCompleted = async (req: Request, res: Response) => {
        const {standId, challengeNumber} = req.body;

        console.log('Ejecutando is challenge complete');

        if (!standId || !challengeNumber || !req.user) {
            return res.status(400).json({ message: 'No se enviaron los datosnecesarios para procesar la consulta'});
        }

        try {
            const challengeRepo = getRepository(ChallengeComplete);
            const profileRepo = getRepository(Profile);
            const currentProfile =  await profileRepo.findOne({ where: { user: req.user}});
    
            let challenge = await challengeRepo.findOne({ relations: ['profile','challenge', 'challenge.stand'], where: { challenge: { stand: { id: standId}, number: challengeNumber}, 
                profile: currentProfile}});



            console.log('Challenge encontrado', challenge);
            return challenge ? res.status(200).json({ message: 'Challenge Completed', isChallengeCompleted: true}) : 
            res.status(200).json({ message: 'Challenge Not Completed', isChallengeCompleted: false});

        } catch (e) {
            console.log('Error', e);
            return res.json({ message: 'Ha ocurrido un error'});
        }


    }

    challengesCompleted = async (req: Request, res: Response) => {

        const {standId} = req.body;

        console.log('Ejecutando is challenge complete');

        if (!standId|| !req.user) {
            return res.status(400).json({ message: 'No se enviaron los datosnecesarios para procesar la consulta'});
        }

        try {
            const challengeRepo = getRepository(ChallengeComplete);
            const profileRepo = getRepository(Profile);
            const currentProfile =  await profileRepo.findOne({ where: { user: req.user}});
    
            const challenges = await challengeRepo.find({ relations: ['profile','challenge', 'challenge.stand'], where: { challenge: { stand: { id: standId}}, 
                profile: currentProfile}});



            console.log('Challenges encontrado', challenges);
            return res.status(200).json({ message: 'Challenges completed', challengesCompleted: challenges});


        } catch (e) {
            console.log('Error', e);
            return res.json({ message: 'Ha ocurrido un error'});
        }

    }
}


export default new ChallengeController();