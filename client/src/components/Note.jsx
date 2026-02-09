import React,{useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import EditModal from "./EditModal.jsx";

function Note(props) {
  const [isModalOpen, setIsModalOpen ] = useState(false)
  function handleClick() {
    props.onDelete(props.id);
   
  }
  function handleComplete (){
   
    props.onComplete(props.id)
  }
  function handleCloseModal (){
    props.onRefresh()
    setIsModalOpen(false)
  }

  return (
    <div className="w-90 h-full bg-white gap p-3 rounded-xl shadow-md">
      <div className="flex flex-row m-3">
        <h1 className="font-semibold text-xl">{props.title}</h1>
        <button className="ml-auto" onClick={()=>{setIsModalOpen(true)}}><EditIcon /></button>
      </div>
      
     
      <p className={`w-full p-3 break-words ${props.is_complete? 'line-through':null}`}>{props.content}</p>
      <button className="w-30 h-10 bg-[#f5ba13] m-3 rounded text-white" onClick={handleComplete}>COMPLETED</button>
      <button className="w-30 h-10 bg-red-500 rounded text-white" onClick={handleClick}>DELETE</button>
      {isModalOpen?<EditModal handleCloseModal={handleCloseModal} id={props.id} title={props.title} content={props.content} />:null}
    </div>
  );
}

export default Note;
