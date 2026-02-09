import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import CreateArea from "./CreateArea.jsx";
import axios from "axios";
import { API_URL } from "../API_URL.js";

function App() {
  const [notes, setNotes] = useState([]);
  const [refresh , setRefresh] = useState(0)

  const handleRefresh = ()=>{
    setRefresh(prev => prev + 1)
  }

  const fetchData = async(e)=>{
   
    try {
      const res = await axios.get(`${API_URL}/todos`)
      setNotes(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleDelete = async (id)=>{
    console.log(id)
    try {
      const res = await axios.delete(`${API_URL}/todos/${id}`)
      handleRefresh()
    } catch (error) {
      console.log(error)
    }
  }
  const handleComplete = async(id)=>{
    console.log(id)
    try {
      const res = await axios.patch(`${API_URL}/todos/${id}`)
      handleRefresh()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchData()
  },[refresh])

  return (
    <div className="">
      <Header />
      <CreateArea onRefresh={handleRefresh} />
      <div className="flex gap-4 flex-wrap">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem.id}
              title={noteItem.title}
              content={noteItem.description}
              is_complete={noteItem.is_completed}
              onDelete={handleDelete}
              onComplete={handleComplete}
              onRefresh={handleRefresh}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
