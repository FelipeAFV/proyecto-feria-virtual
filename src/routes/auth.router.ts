import { Router } from "express";
import passport from "passport";
import authController from "../controllers/auth.controller";

const router: Router = Router();

router.post('/signIn', authController.signIn);
router.post('/signUp', authController.signUp);
router.post('/reset-password', authController.forgotPassword);
router.post('/reset-password', authController.forgotPassword);
router.get('/isLogged', passport.authenticate('jwt', { session: false}), authController.isLogged);

export default router;