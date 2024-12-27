import express from 'express';
import signupRoute from './signup.js';
import signinRoute from './signin.js';
import transactionRouter from './transaction.js';
import detailRoute from './details.js';
import graphRoute from './graphs.js'

const router = express.Router();

router.use("/signup", signupRoute);
router.use("/signin", signinRoute);
router.use("/transaction", transactionRouter);
router.use("/get", detailRoute);
router.use("/showBy", graphRoute);

export default router;