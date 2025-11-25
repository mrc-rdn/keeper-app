import React , {useState} from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from "./EditModal"
import EditIcon from '@mui/icons-material/Edit';



function TodoList(props){
    const [isOpen, setIsOpen] = useState(false);

    function handleClick(){
        setIsOpen(true)
    }
    function onClose(){
        setIsOpen(false)
    }
    return(
        <div className="TodoList">
            <p>{props.todo}</p>
            <button className="btn" onClick={handleClick} ><EditIcon /></button>
            <EditModal open={isOpen} close={onClose} taskId={props.id} description={props.todo}/>
            <button className="btn" onClick={()=>{props.delete(props.id)}}><DeleteIcon/></button>
        </div>
    )
}

export default TodoList;