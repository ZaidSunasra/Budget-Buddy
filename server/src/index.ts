import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router as mainRouter } from './routes/mainRouter';
import env from 'dotenv';

const app = express();
env.config();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://budget-buddy-one-rose.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    console.log("CORS headers set for:", req.method, req.url);
    next();
});



app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", mainRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on Port:${process.env.PORT}`);
})