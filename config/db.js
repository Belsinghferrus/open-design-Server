

import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg; 

const DB = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

DB.on("connect", () => {
    console.log("✅ PostgreSQL Connected!");
});

export default DB;
