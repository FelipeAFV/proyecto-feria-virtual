import { Request, Response, Router } from "express";
import { getFileStream } from "../services/s3";

const router = Router();


router.get('/capsulas/:standNumber/:file', (req: Request, res: Response) => {
    let fileName = req.originalUrl;
    fileName = fileName.replace('/','');

    console.log('Solicitando archivo', req.url, req.originalUrl);
    try {
        const readStream =  getFileStream(fileName);

        readStream?.on('error', () => {
            res.json({error: 'No se pudo recolectar archivo desde amazon'});
            res.end();
        })
        return readStream ? readStream.pipe(res) : res.json({error: 'No se pudo recolectar archivo desde amazon'});;

    } catch (err) {
        console.log(err);
        return res.json({error: 'No se pudo recolectar archivo desde amazon'});
    }
});


export default router;