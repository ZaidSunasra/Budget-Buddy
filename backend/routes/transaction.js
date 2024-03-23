import express from 'express';
import zod, { number } from 'zod';
import authMiddleware from '../middlewares/auth.js';
import getIdMiddleware from '../middlewares/getId.js';
import db from '../db.js';

const router = express.Router();

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

    const { success } = addTransactionBody.safeParse({ ...req.body, amount });
    if (!success) {
        return res.json({
            msg: "Invalid data input"
        })
    }

    try {

        await db.query("INSERT INTO transactions(user_id, title, description, amount, category, transaction_type, date) values($1, $2, $3, $4, $5, $6, $7)", [res.locals.id, req.body.title, req.body.description, amount, req.body.category, req.body.type, req.body.date]);

        res.json({
            msg: "Transaction added successfully"
        })

    } catch (error) {

        return res.json({
            msg: error,
        })

    }

});

const editTransactionBody = zod.object({
    transactionId: zod.string(),
    title: zod.string().optional(),
    description: zod.string().optional(),
    category: zod.string().optional(),
    type: zod.string().optional(),
    date: zod.coerce.date().optional(),
    amount: zod.number().optional()
});

router.patch("/edit", authMiddleware, getIdMiddleware, async (req, res) => {

    const amount = parseFloat(req.body.amount);

    const { success } = editTransactionBody.safeParse({ ...req.body, amount });

    if (!success) {
        return res.json({
            msg: "Invalid data"
        })
    }

    await db.query("UPDATE transactions SET title=$1, description=$2, amount=$3, category=$4, transaction_type=$5, date=$6 WHERE transaction_id=$7", [req.body.title, req.body.description, amount, req.body.category, req.body.type, req.body.date, req.body.transactionId]);

    res.json({
        msg: "Transaction edited successfully"
    })

});

const deleteTransactionBody = zod.object({
    transactionId: zod.string()
})

router.delete("/delete", authMiddleware, getIdMiddleware, async (req, res) => {

    const { success } = deleteTransactionBody.safeParse(req.body);

    if(!success){
        return res.json({
            msg: "Invalid data"
        })
    }

    await db.query("DELETE FROM transactions WHERE transaction_id = $1", [req.body.transactionId]);

    res.json({
        msg: "Transaction deleted successfully"
    })

});

export default router;