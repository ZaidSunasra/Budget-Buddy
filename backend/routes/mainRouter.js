import express from 'express';
import signupRoute from './signup.js';
import signinRoute from './signin.js';
import transactionRouter from './transaction.js';
import detailRoute from './details.js';

const router = express.Router();

router.use("/signup", signupRoute);
router.use("/signin", signinRoute);
router.use("/transaction", transactionRouter);
router.use("/get", detailRoute);

export default router;