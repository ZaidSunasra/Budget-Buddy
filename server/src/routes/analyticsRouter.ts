import  express from 'express';
import { authMiddleware } from "../middlewares/authMiddleware";
import { monthlyAnalyticsController, sortByCategoryController } from "../controllers/analyticsController";

export const analyticsRouter = express.Router();

analyticsRouter.get("/byCategory", authMiddleware, sortByCategoryController);
analyticsRouter.get("/monthly", authMiddleware, monthlyAnalyticsController);