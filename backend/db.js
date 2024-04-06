import pg from 'pg';
import env from 'dotenv'

env.config();

const db = new pg.Client({
    connectionString: process.env.PG_CONN_STRING,
    ssl:{
        rejectUnauthorized: false
    }
    // user: "postgres",
    // host: "localhost",
    // database: "Budget Buddy",
    // password: process.env.POSTGRE_PASSWORD,
    // port: 5432
});

await db.connect();

export default db;

