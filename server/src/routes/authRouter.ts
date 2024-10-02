import express from 'express';
import { signinController, signupController } from '../controllers/authController';

export const authRouter = express.Router();

authRouter.post("/signin", signinController);
authRouter.post("/signup", signupController);