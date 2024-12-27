import express from 'express';
import zod from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import db from '../db.js';

const router = express.Router();
env.config();

const signupBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})

router.post("/", async (req, res) => {

    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.json({
            msg: "Incorrect input",
        })
    }

    try {

        const email = req.body.email;
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rowCount > 0) {
            return res.json({
                msg: "User already exist. Please login"
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await db.query("INSERT INTO users(first_name, last_name, email, password, balance) VALUES($1, $2, $3, $4, 0)",
            [req.body.firstName, req.body.lastName, email, hashedPassword]);

        const token = jwt.sign({ email }, process.env.JWT_SECRET);

        res.status(200).json({
            msg: "User account created",
            token: token
        });

    } catch (error) {
        return res.json({
            msg: "Error creating account " + error
        });
    }

});


export default router;