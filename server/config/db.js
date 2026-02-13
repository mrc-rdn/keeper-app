import {Pool} from "pg"
import env from 'dotenv'
env.config();

const pool = new Pool({
//    connectionString: process.env.DATABASE_URL,
//    ssl: 
//      process.env.NODE_ENV === "production" 
//      ? {rejectUnauthorized: false } 
//      : false, 
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

pool.on("connect", ()=>{
  console.log("connect to the databse")
})

pool.on("error", (error)=>{
  console.error("Database error", error)
})

export default pool;