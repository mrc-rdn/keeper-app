import React, {useState} from "react"
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"

const API_URL = "http://localhost:3000/todos"


const addTaskContainer ={
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

}

function addTodo (){
    const [inputText, setInputText] = useState("")
    const [isMouseOver, setMouseOver] = useState(false);

    function handleChange(event){
        setInputText(event.target.value)
    }

    async function onSubmitTodo(event){
        event.preventDefault();
        try{
            const response = await axios.post(API_URL, {
                description: inputText,
            });
            console.log("todo has been added", response.data)
            window.location = "/"
        }catch(err){
            console.error(err.message)
        }

    }

    

    return(
        <div style={addTaskContainer}>
            <form className="addTaskForm" onSubmit={onSubmitTodo}>

                <input 
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Add Todo Task"
                    value={inputText}
                    maxLength="122"
                />

                <button
                type="submit"
                onMouseOut={() => setMouseOver(false)}
                onMouseOver={() => setMouseOver(true)}
                style={isMouseOver?{backgroundColor:"white", color:"#FF9013"  }:null }
                >
                <AddIcon />
                </button>
            </form>
        </div>
    )
}

export default addTodo