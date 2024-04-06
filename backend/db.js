import pg from 'pg';
import env from 'dotenv'

env.config();

const db = new pg.Client({
    connectionString: process.env.PG_CONN_STRING,
    ssl:{
        rejectUnauthorized: false
    }
});

await db.connect();

export default db;

