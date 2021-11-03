import { getRepository } from "typeorm";
import { Challenge } from "../model/entity/Challenge";
import { Stand } from "../model/entity/Stand";

const createStands = async () => {
    
    const standsRepo = getRepository(Stand);
    for (let stand of stands) {
        await standsRepo.save(stand);
    }
    
}

const createChallenges = async () => {
    const standsRepo = getRepository(Stand);
    const challengeRepo = getRepository(Challenge);
    const allStands = await standsRepo.find();

    let challengeId = 1;

    for (let stand of allStands) {
        for (let i = 1; i <= 3; i++) {

            let challenge: Challenge = {
                id: challengeId,
                stand: stand,
                number: i,

            };
            challengeRepo.save(challenge);
            challengeId++;
        }
    }
}

export { createChallenges, createStands};

const stands: Stand[] = [
    { id: 1, theme: 'Socioemocional'},
    { id: 2, theme: 'Medioambiente' },
    { id: 3, theme: 'Bienestar'},
    { id: 4, theme: 'Creatividad'},
    { id: 5, theme: 'Kids'},
    { id: 6, theme: 'Books'},
    { id: 7, theme: 'Class'},
]