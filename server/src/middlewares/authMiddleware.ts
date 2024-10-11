import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import { db } from '../db/db';

env.config();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<any>=> {
    try {
        const token = req.cookies.Token;
        if (!token) {
            return res.status(401).send({ msg: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };

        if (!decoded.email) {
            return res.status(401).send({ msg: "Unauthorized: Invalid token" });
        }

        const result = await db.query("SELECT id FROM users WHERE email=$1", [decoded.email]);

        if (result.rowCount === 0) {
            return res.status(401).send({ msg: "Unauthorized: User not found" });
        }

        res.locals.id = result.rows[0].id;

        next();

    } catch (error) {
        console.log("Middleware error: ", error);
        return res.status(500).send({ msg: "Internal server error" });
    }
}