import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router as mainRouter } from './routes/mainRouter';
import env from 'dotenv';

const app = express();
env.config();

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigin = "https://budget-buddy-one-rose.vercel.app";
        if (origin === allowedOrigin || origin === `${allowedOrigin}/`) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", mainRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on Port:${process.env.PORT}`);
})