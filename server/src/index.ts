import express, {Request, Response} from 'express';

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Server Up and Healthy");
})

app.listen(3000, () =>{
    console.log('Server running on port 30000');
})