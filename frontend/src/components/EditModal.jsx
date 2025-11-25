import React, {useState} from 'react'
import axios from "axios"
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { borderRadius, justifyContent, positions } from '@mui/system';

const API_URL ="http://localhost:3000/todos"

const modalBackground ={
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000

}

const modalStyles = {
    width: "500px",
    height: "200px",
    backgroundColor: "#F5F1DC",
    borderRadius: "10px",
}


export default function EditModal(props) {

    const [text, setText] = useState("")
    const [description, setdescription] =useState(props.description);
   
    if(!props.open)return null;

    async function submitTask(event){
        event.preventDefault();

        try{
            const id = props.taskId;
            const response = await axios.put(API_URL + `/${props.taskId}`, {
                description: text,
            })
            console.log(`successful editing`)
            window.location = "/"
        }catch(err){
            console.log(err.message)
        }
    }

    function handleChange(event){
        setText(event.target.value)
        setdescription(event.target.value)
    }

  
        
  return (
    <div style={modalBackground}>
        <div style={modalStyles}>
            <div className="modalHeader">
                <h5><EditIcon/> Edit Task</h5>
                <button onClick={props.close}><CloseIcon /></button>
            </div>
            
            <form action="" onSubmit={submitTask} className='modalEditForm'>
                <input 
                type="text" 
                maxLength="122" 
                onChange={handleChange} 
                value={description}/>

                <button type="submit">Submit</button>
            </form>
            
            
            
        </div>
        
    </div>
  )
}
