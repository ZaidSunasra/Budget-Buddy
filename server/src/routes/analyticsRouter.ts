import  express from 'express';
import { authMiddleware } from "../middlewares/authMiddleware";
import { currentMonthAnalysisController, monthlyAnalyticsController, sortByCategoryController, yearlyAnalyticsController } from "../controllers/analyticsController";

export const analyticsRouter = express.Router();

analyticsRouter.get("/byCategory", authMiddleware, sortByCategoryController);
analyticsRouter.get("/monthly", authMiddleware, monthlyAnalyticsController);
analyticsRouter.get("/yearly", authMiddleware, yearlyAnalyticsController);
analyticsRouter.get("/currentMonth", authMiddleware, currentMonthAnalysisController);