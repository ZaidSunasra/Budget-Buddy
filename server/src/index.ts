import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router as mainRouter } from './routes/mainRouter';
import env from 'dotenv';

const app = express();
env.config();

app.options("*", cors({
    origin: "https://budget-buddy-one-rose.vercel.app",  // Your frontend URL
    credentials: true,
}));

app.use(cors({
    credentials: true,
    origin: "https://budget-buddy-one-rose.vercel.app/"
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", mainRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on Port:${process.env.PORT}`);
})