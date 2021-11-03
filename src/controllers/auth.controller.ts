import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { compareHashedPassword, encrypt } from "../utils/password-encrypt";
import jwt from "jsonwebtoken";
import { transporter } from "./../config/mailer";
import { User } from "../model/entity/User";
import { Profile } from "../model/entity/Profile";
import { roleGenerator } from "../utils/role.utils";
import { Role } from "../model/interface/role";
import { UserRole } from "../model/enums/user-role";
import { Student } from "../model/entity/Student";
import { Representative } from "../model/entity/Representative";
import { Profesor } from "../model/entity/Profesor";



class AuthController {


    signUp = async (req: Request, res: Response) => {
        const userRepo = getRepository(User);

        console.log(req.body);
        const { username, password } = req.body;
        const userToCheck = await userRepo.findOne({ username: username });

        if (userToCheck) {
            return res.status(400).json({ error: 'Username already exist' })
        }

        /**Creación de usuario */
        const hashedPass = await encrypt(password);
        const user: User = new User();

        user.username = username;
        user.password = hashedPass;


        /** Creacion de profile */
        const profile: Profile = req.body;




        console.log('Profile a crear ', profile);

        let users = await userRepo.find();
        console.log('Todos usuarios 1 ', users.length);

        const insertedUser: User = await userRepo.save(user);

        users = await userRepo.find();
        console.log('Todos usuarios 2 ', users.length);


        profile.user = insertedUser;
        const insertedProfile: Profile = await getRepository(Profile).save(profile);

        /** Creacion de rol */
        const role: Role | undefined = roleGenerator(insertedProfile, req.body);


        if (role) {
            let insertedRole;
            switch (profile.role) {
                case UserRole.ALUMNO:

                    insertedRole = await getRepository(Student).save(role);
                    break;
                case UserRole.APODERADO:
                    insertedRole = await getRepository(Representative).save(role);

                    break;
                case UserRole.PROFESOR:
                    insertedRole = await getRepository(Profesor).save(role);

                    break;

            }
        }
        res.cookie('jwt', jwt.sign({ userId: insertedUser.id }, 'SECRET'), { httpOnly: true });
        return res.status(200).json({ success: 'Successfully registered' });
    }

    signIn = async (req: Request, res: Response) => {
        // const userRepo = getRepository(User);
        const { username, password } = req.body;


        const user = await getRepository(User).findOne({ username: username });

        if (!user) {
            return res.status(401).json({ error: 'Username not valid' });
        }
        const validPassword = await compareHashedPassword(password, user.password);

        if (validPassword) {
            res.cookie('jwt', jwt.sign({ userId: user.id }, 'SECRET'), { httpOnly: true });
        } else {
            return res.status(401).json({ error: 'Incorrect password' });
        }


        res.end();
    }
    forgotPassword = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const { email } = req.body;
        //Verificar si el email se manda
        if (req.body.email === '') {
            res.status(400).send('Email required');
        }
        const message = 'Revisa tu email para cambiar tu contraseña';
        let verificationLink;
        let emailStatus: any = 'Ok';
        let user: User;

        //Encontrando al usuario por su email
        try {
            user = await userRepository.findOneOrFail({
                where: { profile: { email: email } }, relations: ['profile']
            })

            const token = jwt.sign({ userId: user.id, username: user.username }, 'SECRET2', { expiresIn: '10m' });
            verificationLink = `http://localhost:4000/auth/change-password/${token}`;
            user.resetPasswordToken = token;
            //console.log(user);
        } catch (error) {
            return res.json({ message });
        }
        //NODE MAILER 
        try {
            await transporter.sendMail({
                from: '"Forgot Password" <feriavirtualdidaxia@gmail.com>',
                to: user.profile.email,
                subject: 'Cambio de contraseña',
                html: `<b> Please click on the following link, or paste this into your browser to complete de proccess</b>
                <a href="${verificationLink}">${verificationLink}</a>
                `
            })
        } catch (error) {
            emailStatus = error;
            return res.status(400).json({ message: 'Something went wrong' });
        }
        //Proceso de guardado
        try {
            await getRepository(User).save(user);
        } catch (error) {
            emailStatus = error;
            return res.status(400).json({ message: 'Something went wrong' });
        }

        res.json({ message, info: emailStatus });
    }

    changePassword = async (req: Request, res: Response) => {

        const { password, repeatPassword } = req.body;
        const sendToken = req.body.token

        const userRepository = getRepository(User);
        let jwtPayload;
        let user: User;
        try {
            jwtPayload = jwt.verify(sendToken, 'SECRET2');
            user = await userRepository.findOneOrFail({ where: { resetPasswordToken: sendToken } });
            console.log(user);

        } catch (error) {
            return res.status(422).json({ message: error });
        }

        const hashedPass = await encrypt(password);
        try {
            user.password = hashedPass;
            await userRepository.save(user);
        } catch (error) {
            return res.status(401).json({ message: error });
        }

        return res.status(401).json({ message: "Algo ha ido mal" });




    }


    isLogged = async (req: Request, res: Response) => {
        return res.status(200).json({ message: 'Is logged'});
    }
}


export default new AuthController();