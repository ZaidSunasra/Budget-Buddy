import express from 'express';
import zod from 'zod';
import authMiddleware from '../middlewares/auth.js';
import getIdMiddleware from '../middlewares/getId.js';
import db from '../db.js';

const router = express.Router();

async function updateFinalBalance(id) {

    const income = await db.query("SELECT * FROM transactions WHERE transaction_type = $1 AND user_id = $2", ["income", id]);
    const expense = await db.query("SELECT * FROM transactions WHERE transaction_type = $1 AND user_id = $2", ["expense", id]);
    let totalIncome = 0, totalExpense = 0;

    for (let i = 0; i < income.rowCount; i++) {
        let tempIncome = parseFloat(income.rows[i].amount);
        totalIncome += tempIncome;
    }

    for (let i = 0; i < expense.rowCount; i++) {
        let tempExpense = parseFloat(expense.rows[i].amount);
        totalExpense += tempExpense;
    }

    const updatedBalance = totalIncome - totalExpense;

    await db.query("UPDATE users SET balance = $1 WHERE user_id = $2", [updatedBalance, id]);
    

}

router.get("/get", authMiddleware, getIdMiddleware, async (req, res) => {

    const transactions = await db.query("SELECT * FROM transactions WHERE user_id = $1", [res.locals.id]);

    res.json({
        transactions
    })
})

router.get("/filter", authMiddleware, getIdMiddleware, async (req, res) => {

    const filterQuery = req.query.filter;

    const filter = await db.query("SELECT * FROM transactions WHERE user_id = $1 AND title LIKE $2 OR description LIKE $3", [res.locals.id, "%"+filterQuery+"%", "%"+filterQuery+"%"]);

    res.json({
        filter
    })

});

router.get("/get/:id", authMiddleware, getIdMiddleware, async (req, res) => {

    const id = req.params.id;

    const transaction = await db.query("SELECT * FROM transactions WHERE transaction_id = $1", [id]);

    res.json({
        transaction
    })
})

const addTransactionBody = zod.object({
    title: zod.string(),
    description: zod.string(),
    category: zod.string(),
    type: zod.string(),
    date: zod.coerce.date(),
    amount: zod.number()
});

router.post("/add", authMiddleware, getIdMiddleware, async (req, res) => {

    const amount = parseFloat(req.body.amount);
    let category = req.body.category;
    category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    const { success } = addTransactionBody.safeParse({ ...req.body, amount });
    if (!success) {
        return res.json({
            msg: "Invalid data input"
        })
    }

    try {

    await db.query("INSERT INTO transactions(user_id, title, description, amount, category, transaction_type, date) values($1, $2, $3, $4, $5, $6, $7)", [res.locals.id, req.body.title, req.body.description, amount, category, req.body.type, req.body.date]);

    await updateFinalBalance(res.locals.id);

    res.json({
        msg: "Transaction added successfully"
    })

    } catch (error) {
        return res.json({
            msg: error
        })
    }

});

const editTransactionBody = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(),
    category: zod.string().optional(),
    type: zod.string().optional(),
    date: zod.coerce.date().optional(),
    amount: zod.number().optional()
});

router.patch("/edit/:id", authMiddleware, getIdMiddleware, async (req, res) => {

    const amount = parseFloat(req.body.amount);
    const id = req.params.id;

    const { success } = editTransactionBody.safeParse({ ...req.body, amount });

    if (!success) {
        return res.json({
            msg: "Invalid data"
        })
        
    }

    await db.query("UPDATE transactions SET title=$1, description=$2, amount=$3, category=$4, transaction_type=$5, date=$6 WHERE transaction_id=$7", [req.body.title, req.body.description, amount, req.body.category, req.body.type, req.body.date, id]);

    await updateFinalBalance(res.locals.id);

    res.json({
        msg: "Transaction edited successfully"
    })

});

router.delete("/delete", authMiddleware, getIdMiddleware, async (req, res) => {

    const id = req.query.id

    await db.query("DELETE FROM transactions WHERE transaction_id = $1", [id]);

    await updateFinalBalance(res.locals.id);

    res.json({
        msg: "Transaction deleted successfully"
    })

});

export default router;