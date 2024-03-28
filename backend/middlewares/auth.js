import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(403).json({
            msg: "Wrong header format."
        })
    }

    const token = authHeader.split(" ")[1];

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.email = decoded.email;
        next();

    } catch(error){
        return res.status(404).json({
            msg: "Error " + error
        })
    }

} 

export default authMiddleware;

