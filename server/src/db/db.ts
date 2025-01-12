import { Pool } from "pg";
import env from "dotenv";

env.config();

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
