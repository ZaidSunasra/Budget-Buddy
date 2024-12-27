import express from 'express';
import zod from 'zod';
import bcrypt from 'bcrypt';
import db from '../db.js';
import jwt from 'jsonwebtoken';
import env from 'dotenv';

const router = express.Router();
env.config();

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

router.post("/", async (req, res) => {

    const { email, password } = req.body;

    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.json({
            msg: "Invalid input",
            success
        });
    }

    try {

        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rowCount == 0) {
            return res.json({
                msg: "User not found."
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

        if (!passwordMatch) {
            return res.json({
                msg: "Incorrect Password"
            })
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);

        return res.json({
            msg: "Login successfull",
            token: token
        });

    } catch (error) {
        return res.json({
            error: "Error logging in\n" + error,
        });
    }

})

export default router;