import db from '../db.js'

const getIdMiddleware = async (req, res, next) => {

    try {

        let userId = await db.query("SELECT user_id FROM users WHERE email = $1", [res.locals.email]);
        userId = userId.rows[0].user_id;
        res.locals.id = userId;
        next();

    } catch (error) {
        return res.json({
            msg: "Error " + error
        });
    }

}

export default getIdMiddleware;