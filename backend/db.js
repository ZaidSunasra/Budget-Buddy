import pg from 'pg';
import env from 'dotenv'

env.config();

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Budget Buddy",
    password: process.env.POSTGRE_PASSWORD,
    port: 5432
});

await db.connect();

export default db;

