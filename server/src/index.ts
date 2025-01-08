import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router as mainRouter } from './routes/mainRouter';
import env from 'dotenv';

const app = express();
env.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", mainRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on Port:${process.env.PORT}`);
})