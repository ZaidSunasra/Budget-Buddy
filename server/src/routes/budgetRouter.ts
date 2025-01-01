import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { addBudgetController, deleteBudgetController, editBudgetController, getBudgetController } from '../controllers/budgetController';

export const budgetRouter = express.Router();

budgetRouter.get("/get", authMiddleware, getBudgetController);
budgetRouter.post("/add", authMiddleware, addBudgetController);
budgetRouter.put("/edit/:id", authMiddleware, editBudgetController);
budgetRouter.delete("/delete/:id", authMiddleware, deleteBudgetController);