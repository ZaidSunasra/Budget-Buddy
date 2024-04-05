import express from "express";
import authMiddleware from "../middlewares/auth.js";
import getIdMiddleware from "../middlewares/getId.js";
import db from "../db.js";


const router = express.Router();

router.get("/category", authMiddleware, getIdMiddleware, async (req, res) => {
    try {
        const categoryWise = await db.query("SELECT  category, SUM(amount) AS total_expense FROM transactions WHERE user_id = $1 AND transaction_type = $2 GROUP BY category ORDER BY category ASC", [res.locals.id, 'expense']);

        res.json({
            categoryWise
        })

    } catch (error) {
        res.json({
            error: "Error -> " + error
        })
    }
})

router.get("/last7Days", authMiddleware, getIdMiddleware, async (req, res) => {
    try {

        const dateWiseExpense = await db.query("SELECT date, SUM(amount) AS total_expense  FROM transactions WHERE date BETWEEN NOW() - INTERVAL '7 DAYS' AND NOW() AND transaction_type = $1 AND user_id = $2 GROUP BY date", ['expense', res.locals.id]);

        const dateWiseIncome = await db.query("SELECT date, SUM(amount) AS total_income  FROM transactions WHERE date BETWEEN NOW() - INTERVAL '7 DAYS' AND NOW() AND transaction_type = $1 AND user_id = $2 GROUP BY date", ['income', res.locals.id])

        res.json({
            dateWiseExpense, dateWiseIncome
        })

    } catch (error) {
        res.json({
            error
        })
    }
})

export default router;