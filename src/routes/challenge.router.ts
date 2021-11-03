import { Router } from "express";
import challengeController from "../controllers/challenge.controller";



const router = Router();

router.post('/isChallengeCompleted', challengeController.isChallengeCompleted);
router.post('/challengesCompleted', challengeController.challengesCompleted);

export default router;