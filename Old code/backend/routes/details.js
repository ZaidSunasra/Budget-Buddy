import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import getIdMiddleware from '../middlewares/getId.js';
import db from '../db.js';

const router = express.Router();

router.get("/userDetails", authMiddleware, getIdMiddleware, async (req, res) => {
    try {
        const details = await db.query("SELECT first_name FROM users WHERE user_id = $1", [res.locals.id]);
        res.json({
            details: details.rows
        });
    } catch (error) {
        res.json({
            error
        })
    }
})

router.get("/incomeDetails", authMiddleware, getIdMiddleware, async (re, res) => {
    try {
        const income = await db.query("SELECT * FROM transactions WHERE transaction_type = $1 AND user_id = $2", ["income", res.locals.id]);
        const expense = await db.query("SELECT * FROM transactions WHERE transaction_type = $1 AND user_id = $2", ["expense", res.locals.id]);
        let totalIncome = 0, totalExpense = 0;
        for (let i = 0; i < income.rowCount; i++) {
            let tempIncome = parseFloat(income.rows[i].amount);
            totalIncome += tempIncome;
        }
        for (let i = 0; i < expense.rowCount; i++) {
            let tempExpense = parseFloat(expense.rows[i].amount);
            totalExpense += tempExpense;
        }
        let balance = totalIncome - totalExpense;
        res.json({
            income: totalIncome,
            expense: totalExpense,
            balance
        });
    } catch (error) {
        res.json({
            error
        });
    }
});

export default router;