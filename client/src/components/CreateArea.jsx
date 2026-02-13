import React, { useState } from "react";
import axios from 'axios'
import {API_URL} from '../API_URL.js'
axios.defaults.withCredentials = true;
function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const submitNote = async(event)=> {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/todos`,{description: note.content, title: note.title}, {withCredentials: true})
       setNote({
          title: "",
          content: ""
        });
      props.onRefresh()
    } catch (error) {
      console.log(error)
    }
    
   
    
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
