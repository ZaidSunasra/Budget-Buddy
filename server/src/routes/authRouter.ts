import express from 'express';
import { logoutController, signinController, signupController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const authRouter = express.Router();

authRouter.post("/signin", signinController);
authRouter.post("/signup", signupController);
authRouter.post("/logout", authMiddleware, logoutController)