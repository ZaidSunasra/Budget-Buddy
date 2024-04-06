import express from 'express';
import rootRouter from './routes/mainRouter.js'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'https://budget-buddy-gamma.vercel.app'
}));

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json())

app.use("/", rootRouter);

app.listen(PORT, function() {
    console.log("Server running on Port " + PORT);
})