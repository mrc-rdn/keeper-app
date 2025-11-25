import express from "express"
import pg from "pg"
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "todos",
    password: "12345",
    port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

//create a todo 
app.post("/todos", async(req, res)=>{
    try{
        const inputTodo = req.body.description;
        const response = await db.query("INSERT INTO todos (description) VALUES ($1) RETURNING *",
             [inputTodo])
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
        const {description} = req.body;
        const response = await db.query("UPDATE todos SET description = $1 WHERE id = $2", [description, id])
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