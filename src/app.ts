import dotenv from "dotenv";
dotenv.config();
import { createConnection, getRepository } from "typeorm";
import "reflect-metadata";
import cookieParser from "cookie-parser";
import express, { Request, Response, json, NextFunction} from 'express';
import passport from "passport";
import configure from "./config/passport";
import authRoutes from "./routes/auth.router";
import imagesRouter from "./routes/images.router";
import mediaRouter from "./routes/media.router";
import challengeRoutes from "./routes/challenge.router";
import cors from "cors";
import path from "path";
import fs from "fs";
import multer from "multer";
import { Challenge } from "./model/entity/Challenge";
import { Profile } from "./model/entity/Profile";
import { ChallengeComplete } from "./model/entity/ChallengeComplete";
import { createChallenges, createStands } from "./config/create-database";
import { getFileStream, uploadChallengeToS3 } from "./services/s3";

// mysql://bca2f21cf6f36a:dd4eddfe@us-cdbr-east-04.cleardb.com/heroku_13850906d1c05ef?reconnect=true
if (process.env.NODE_ENV == 'production') {

    console.log('Creando conexion en produccion');
    createConnection({
        username: 'bca2f21cf6f36a',
        password: 'dd4eddfe',
        host: 'us-cdbr-east-04.cleardb.com',
        database: 'heroku_13850906d1c05ef',
        type: "mysql",
        port: 3306,
        synchronize: true,
        entities: [
            "dist/model/entity/**/*.js"
        ],
    })
    .then( async (connection) => {
        await createStands();
        createChallenges();
        
        
        console.log('Connection successful')
    }).catch(error => console.log(error));
    
} else {
    console.log('Creando conexion en desarrollo');
    createConnection()
        .then( async (connection) => {
            await createStands();
            createChallenges();
    
            
        console.log('Connection successful')
    }).catch(error => console.log(error));
}

const storage = multer.diskStorage(
    { 
        destination: (req, file, cb) => {
            cb(null, process.cwd()+'/src/uploads/challenges/');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });

const upload = multer({storage});

configure(passport);


const app = express();

app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(passport.initialize());

app.use('/assets/images', imagesRouter);
app.use('/assets/media', mediaRouter);

app.use(express.static(path.join(process.cwd(), 'frontend/build')));



// app.use('/', (req: Request, res: Response, next: NextFunction) => {
    //     res.json('Hola soy un middleware');
    //     next();
    // });

app.use('/isLogged', passport.authenticate('jwt', { session: false}), authRoutes);
app.use('/auth', (req, res, next) => {
    console.log('Redirigiendo a auth route');
    next();
}, authRoutes );


app.use('/api', passport.authenticate('jwt', {session: false}), (req: Request, res: Response, next: NextFunction) => {
    console.log('User', req.user);
    next();
}); 

app.use('/api/challenge', challengeRoutes);

// app.use('/api/pdf', async (req: Request, res: Response) => {
//     try {
//         const pdf = await fs.readFileSync(path.join(process.cwd(),'/src/pdf/CUENTODIDAXIAfinal.pdf'));
//         res.send(pdf);
        
//     } catch (err) {
//         console.log('Error al leer pdf', err)
//     }
// });

// app.get('/assets/images/:fileKey', (req: Request, res: Response) => {
//     const fileKey = req.params.fileKey;

//     try {
//         const readStream =  getFileStream(fileKey);

//         readStream?.on('error', () => {
//             res.json({error: 'No se pudo recolectar archivo desde amazon'});
//             res.end();
//         })
//         return readStream ? readStream.pipe(res) : res.json({error: 'No se pudo recolectar archivo desde amazon'});;

//     } catch (err) {
//         console.log(err);
//         return res.json({error: 'No se pudo recolectar archivo desde amazon'});
//     }

// });

app.post('/api/uploadChallenge', upload.single('challengeImage'), async (req: Request, res: Response, next: NextFunction) => {
    console.log('Headeers',req.headers);
    const { standId, challengeNumber } = req.body;
    // return res.end();

    console.log(standId, challengeNumber, req.body);

    try {

        console.log('File captured by Multer', req.file);
        const challenge = await getRepository(Challenge).findOne({ 
            where: { stand: {id: standId}, number: challengeNumber},
            relations: ['stand']
        });

        
        
        if (!challenge) {
            res.status(401).json({ message: 'Desafio no valido'});
            return;
            
        }
        const profile = await getRepository(Profile).findOne({where: {user: req.user}});
        
        if (!profile) {
            res.status(401).json({ message: 'Profile no encoontrado'});
            return;
        }
        
        const challengeCompleted: ChallengeComplete = { 
            id: 0,
            challenge: challenge,
            date: new Date(),
            filename: 'file',
            profile: profile 
            
        };
        
        console.log('Guardando imagen');

        if (!req.user) {
            return;
        }

        try {
            const s3UploadResult = await uploadChallengeToS3(req.file, req.user.id+'', standId, challengeNumber);
            console.log('S3 response', s3UploadResult);
            if (req.file) {

                fs.unlinkSync(req.file?.path);
                console.log('Archivo borrado');
            }
            
        } catch (err) {
            console.log('Error al subir archivo a s3', err);
        }

        
        const challengeCompletedRepo = getRepository(ChallengeComplete);

        const challengeCompleteRepeated = await challengeCompletedRepo.findOne({ where: {
            challenge: challenge, profile: profile
        }});
        if (challengeCompleteRepeated) {
            console.log('Desafio ya completado');
        } else {
            
            challengeCompletedRepo.save(challengeCompleted);
        }
        res.end();
    } catch (err) {
        console.log(err);
    }
});




function handleImage(req: Request, res: Response) {
    console.log(req);
    res.end('success');
}

app.get('*', function (req, res) {
    res.sendFile(path.join(process.cwd(), 'frontend/build', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Aplicación corriendo en puerto', port);
    console.log('Ambiente', process.env.NODE_ENV);
});



