import express from "express"
import pg from "pg"
import bodyParser from "body-parser";
import cors from "cors"
import env from 'dotenv'
env.config();

const app = express();
const port = process.env.Port || 8080
  
const db = new pg.Pool({
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



app.use(bodyParser.urlencoded({extended: true}));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your React app's URL
    
  })
);
app.use(express.json());

//create a todo 
app.post("/todos", async(req, res)=>{
    try{
        const {description, title} = req.body;
        const response = await db.query("INSERT INTO todos (description, title) VALUES ($1, $2) RETURNING *",
             [description, title])
        res.json(response.rows[0])
    }catch(err){
        console.log("error on adding todo", err)
    }
});

//get specific todo
app.get("/todos/:id", async(req, res)=>{
    try{
        const { id } = req.params
        const response = await db.query("SELECT * FROM todos WHERE id = $1", 
            [id])
        res.json(response.rows[0])
    }catch(err){
        console.log("error on getting the todos", err)
    }
});

app.patch('/todos/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const response = await db.query('UPDATE todos SET is_completed = true WHERE id = $1 RETURNING *', [id])
        res.json(response.rows[0])
    } catch (error) {
        console.log("error on handling the completed function todos", err)
    }
})
//get all the todo
app.get("/todos", async(req, res)=>{
    try{
        const { id } = req.params
        const response = await db.query("SELECT * FROM todos")
        res.json(response.rows)
    }catch(err){
        console.log("error on getting all todos", err)
    }
});

app.put("/todos/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const {description, title} = req.body;
        const response = await db.query("UPDATE todos SET description = $1, title = $2 WHERE id = $3", [description,title, id])
        res.json("todo was updated");
    }catch(err){
        console.log("error handing the editing", err)
    }

});

app.delete("/todos/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        await db.query("DELETE FROM todos WHERE id = $1",
            [id]
        )
        res.json("todo was deleted");
    }catch(err){
        console.log("error deketing the todo ", err)
    }
});


app.listen(port, ()=>{
    console.log(`now listening in port${port} http://localhost:${port}`)
})