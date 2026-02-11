import express from "express"
import pg from "pg"
import bodyParser from "body-parser";
import cors from "cors"
import env from 'dotenv'
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local"

env.config();

const app = express();
const port = process.env.Port || 8080
const saltRounds = parseInt(process.env.SALTED_ROUNDS);

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
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your React app's URL
    credentials: true,
  })
);


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true if using https
    sameSite: "lax",
    maxAge: 3000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());


function generateNumericId() {
  return Date.now().toString().slice(-6) + Math.floor(100 + Math.random() * 900);
}

app.post("/createaccount", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)

  try { 
    const checkResult = await db.query("SELECT * FROM users WHERE username = $1", [username])
   
    if (checkResult.rows.length > 0 ) {
      res.json({ success: false, error: "Username already exists. Try logging in." })
    } else {
      if (password.length < 8) {

        res.json({ error: "your password is too short" })
      } else {

        bcrypt.hash(password, saltRounds, async (err, hash) => {

          if (err) {
            res.json("Error hasing password:", err)
          } else {
            const usersRes = await db.query("INSERT INTO users (id, username, password) VALUES ( $1, $2, $3) RETURNING *", [generateNumericId(), username, hash,]) 
            
            res.json({ success: true, message: "Account created" })
          }
        })
      }
    }
  } catch (err) {
    res.json(err)
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {

  try {
    if (req.isAuthenticated()) {
        res.json({ success: true, redirectTo: "/keeper" })
    } else {
      res.status(401).json({ success: false, message: 'unauthorized access' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/protectedroute", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      res.status(401).json({ success: false, message: 'Unauthorized' })
    }
    res.status(200).json({ success: true, message: "success login", user: req.user.username })
  } catch (error) {
    res.status(400).json({ success: false, message: "Server error" })
  }
});


//get all the todo
app.get("/todos", async(req, res)=>{
    try{
        const { id } = req.params
        if (!req.isAuthenticated()) {
            res.status(401).json({ success: false, message: 'unauthorized access' })
        }
        const response = await db.query("SELECT * FROM todos  WHERE user_id = $1", [req.user.id] )
        res.json(response.rows)
    }catch(err){
        console.log("error on getting all todos", err)
    }
});

//create a todo 
app.post("/todos", async(req, res)=>{
    try{
        const {description, title} = req.body;
        if (!req.isAuthenticated()) {
            res.status(401).json({ success: false, message: 'unauthorized access' })
        }
        
        const response = await db.query("INSERT INTO todos (description, title, user_id) VALUES ($1, $2, $3) RETURNING *",
             [description, title, req.user.id])
        res.json(response.rows[0])
    }catch(err){
        console.log("error on adding todo", err)
    }
});


app.patch('/todos/:id', async(req, res)=>{
    try {
        const {id} = req.params
        if (!req.isAuthenticated()) {
            res.status(401).json({ success: false, message: 'unauthorized access' })
        }
        const response = await db.query('UPDATE todos SET is_completed = true WHERE id = $1 RETURNING *', [id])
        res.json(response.rows[0])
    } catch (error) {
        console.log("error on handling the completed function todos", err)
    }
})


app.put("/todos/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const {description, title} = req.body;
        if (!req.isAuthenticated()) {
            res.status(401).json({ success: false, message: 'unauthorized access' })
        }
        const response = await db.query("UPDATE todos SET description = $1, title = $2 WHERE id = $3", [description,title, id])
        res.json("todo was updated");
    }catch(err){
        console.log("error handing the editing", err)
    }

});

app.delete("/todos/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        if (!req.isAuthenticated()) {
            res.status(401).json({ success: false, message: 'unauthorized access' })
        }
        await db.query("DELETE FROM todos WHERE id = $1",
            [id]
        )
        res.json("todo was deleted");
    }catch(err){
        console.log("error deketing the todo ", err)
    }
});

app.post("/keeper/logout", (req, res, next) => {

  if (!req.isAuthenticated()) {
    return res.status(400).json({ message: "No active session found" });
  }

  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Failed to destroy session" });

      res.clearCookie("connect.sid");
      return (res.json({ message: "Successfully logged out", redirectTo: "/" }));
    });
  });
});


passport.use(new Strategy(async function verify(username, password, cb) {
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];


      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log("Error comparing passwords:", err);
        } else {
          if (result) {
            return cb(null, user)
          } else {
            return cb(null, false, { message: "Incorrect Password" })

          }
        };
      });
    } else {
      return cb("User not found");
    };
  } catch (err) {
    return cb("error handling", err);
  };
}))

passport.serializeUser((user, cb) => {
  cb(null, user);

});

passport.deserializeUser((user, cb) => {
  cb(null, user)

});


app.listen(port, ()=>{
    console.log(`now listening in port${port} http://localhost:${port}`)
})