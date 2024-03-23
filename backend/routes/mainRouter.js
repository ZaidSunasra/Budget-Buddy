import express from 'express';
import signupRoute from './signup.js';
import signinRoute from './signin.js';
import transactionRouter from './transaction.js';

const router = express.Router();

router.use("/signup", signupRoute);
router.use("/signin", signinRoute);
router.use("/transaction", transactionRouter);

export default router;