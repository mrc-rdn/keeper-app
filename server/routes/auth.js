import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'
import { protect } from '../middleware/auth.js'

const router = express.Router();

const cookieOptions = {
    httpOnly : true,
    secure: process.env.NODE_ENV === 'production',
    samesite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
}

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

router.post('/register', async (req, res)=>{
    const {username, password} = req.body;

    if (!username || !password){
        return res.status(400).json({message: 'Please provide all required fields'})
    }

    const userExits = await pool.query('SELECT * FROM users WHERE username = $1', [username])

    if (userExits.rows.length > 0){
        return res.status(400).json({message: 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username ',
        [username, hashedPassword]
    )

    const token = generateToken(newUser.rows[0].id);

    res.cookie('token', token , cookieOptions);

    return res.status(200).json({user: newUser.rows[0]})
})

//login
router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({message: 'Please provide all required fields'})
    }

    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if(user.rows.length === 0 ){
        return res.status(400).json({message: 'Invalid credentials'})
    }

    const userData = user.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch){
        return res.status(400).json({message: 'Invalid credentials'})
    }

    const token = generateToken(userData.id)

    res.cookie('token', token, cookieOptions);
    res.json({user:{id: userData.id, username: userData.username}})
});

//Me 
router.get("/me", protect, async (req, res)=>{
    res.json(req.user)
})

router.get("/todos", protect, async(req, res)=>{
    try{
        
        const response = await pool.query("SELECT * FROM todos  WHERE user_id = $1", [req.user.id] )
        res.json(response.rows)
    }catch(err){
        console.log("error on getting all todos", err)
    }
});

router.post("/todos", protect, async(req, res)=>{
    try{
        const {description, title} = req.body;
        
        
        const response = await pool.query("INSERT INTO todos (description, title, user_id) VALUES ($1, $2, $3) RETURNING *",
             [description, title, req.user.id])
        res.json(response.rows[0])
    }catch(err){
        console.log("error on adding todo", err)
    }
});

router.patch('/todos/:id',protect, async(req, res)=>{
    try {
        const {id} = req.params
        
        const response = await pool.query('UPDATE todos SET is_completed = true WHERE id = $1 RETURNING *', [id])
        res.json(response.rows[0])
    } catch (error) {
        console.log("error on handling the completed function todos", err)
    }
})

router.put("/todos/:id",protect, async(req, res)=>{
    try{
        const {id} = req.params;
        const {description, title} = req.body;
        
        const response = await pool.query("UPDATE todos SET description = $1, title = $2 WHERE id = $3", [description,title, id])
        res.json("todo was updated");
    }catch(err){
        console.log("error handing the editing", err)
    }

});

router.delete("/todos/:id",protect, async (req, res)=>{
    try{
        const {id} = req.params;
        
        await pool.query("DELETE FROM todos WHERE id = $1",
            [id]
        )
        res.json("todo was deleted");
    }catch(err){
        console.log("error deketing the todo ", err)
    }
});

//logout

router.post('/logout', (req, res)=>{
    res.cookie('token', '', {...cookieOptions, maxAge: 1})
    res.json({message: 'Logged out successfully'})
})


export default router