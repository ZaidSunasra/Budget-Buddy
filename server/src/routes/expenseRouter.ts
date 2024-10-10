import express from 'express';
import { addExpenseController, deleteExpenseController, editExpenseController, getExpenseByIdController, getExpenseController } from '../controllers/expenseController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const expenseRouter = express.Router();

expenseRouter.post("/add", authMiddleware, addExpenseController);
expenseRouter.get("/get/:id", authMiddleware, getExpenseByIdController);
expenseRouter.get("/get", authMiddleware, getExpenseController);
expenseRouter.put("/edit/:id", editExpenseController);
expenseRouter.delete("/delete/:id", authMiddleware, deleteExpenseController);