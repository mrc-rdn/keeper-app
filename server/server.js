import express from "express"
import cors from "cors"
import env from 'dotenv'
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js'
import { protect } from "./middleware/auth.js";

env.config();

const app = express();
const port = process.env.Port || 8080
const saltRounds = parseInt(process.env.SALTED_ROUNDS);


app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your React app's URL
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRoutes);

//get all the todo


//create a todo 



app.listen(port, ()=>{
    console.log(`now listening in port${port} http://localhost:${port}`)
})