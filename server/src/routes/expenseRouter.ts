import express from 'express';
import { addExpenseController, deleteExpenseController, editExpenseController, getExpenseByIdController, getExpenseController, searchExpenseController } from '../controllers/expenseController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const expenseRouter = express.Router();

expenseRouter.post("/add", authMiddleware, addExpenseController);
expenseRouter.get("/get/:id", authMiddleware, getExpenseByIdController);
expenseRouter.get("/get", authMiddleware, getExpenseController);
expenseRouter.put("/edit/:id", authMiddleware, editExpenseController);
expenseRouter.delete("/delete/:id", authMiddleware, deleteExpenseController);
expenseRouter.get("/search", authMiddleware, searchExpenseController);