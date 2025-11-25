import React, { useState,useEffect, Fragment } from 'react'
import axios from "axios";
import AddTodo from "./addtodo"
import TodoList from "./TodoList"
import Header from "./Header"
import "/public/styles.css"

const API_URL = "http://localhost:3000/todos"

function App() {
  const [todos, setTodos] = useState([]);
  

  async function getTodos(){
    try{
      const response = await axios.get(API_URL);
      
      setTodos(response.data)
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=>{
    getTodos();
  },[])

  async function handleDelete(id){
    try{
      await axios.delete(API_URL + `/${id}`);
      setTodos(todos.filter(todo=>{
        return todo.id !== id}))
      console.log("done Deleting todo")
    }catch(err){
      console.log(err.message)
    }
  }

  return (
   <div>
      <Header />
      <AddTodo/>
      <div className="todoListContainer">
        {
          todos.map((todo)=>{
            return <TodoList 
            key={todo.id} 
            id={todo.id} 
            todo={todo.description} 
            delete={handleDelete} />
          })
        }
      </div>
     
      
   </div>
  )
}

export default App
