import express from 'express';
import { authRouter } from './authRouter';
import { expenseRouter } from './expenseRouter';
import { analyticsRouter } from './analyticsRouter';

export const router = express.Router();

router.use("/auth", authRouter);
router.use("/expense", expenseRouter);
router.use("/analytics", analyticsRouter);