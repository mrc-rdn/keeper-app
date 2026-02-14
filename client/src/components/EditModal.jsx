import React, {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { API_URL } from '../API_URL';
axios.defaults.withCredentials = true;
export default function EditModal(props) {
    const [note, setNote] = useState({
        title: props.title,
        content: props.content
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
        const response = await axios.put(`${API_URL}/api/auth/todos/${props.id}`,{description: note.content, title: note.title})
        props.handleCloseModal()
        } catch (error) {
        console.log(error)
        }
    
    }
  return  (
    <div className='w-full h-full absolute bg-black/50 backdrop-blur inset-0 grid place-items-center'>
        <div className='w-10/12 h-5/12 md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white rounded-xl shadow-md p-6 border border-gray-300'>
            <div className='w-full flex'>
                <h1 className='text-xl font-semibold'>Edit</h1>
               <button className='ml-auto' onClick={()=>{props.handleCloseModal()}}><CloseIcon /></button> 
            </div>
            <div className='flex flex-col'>
                <input
                    name="title"
                    className='mt-2 mb-2'
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                    />
                    <textarea
                    className='m-2'
                    name="content"
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows="3"
                    />
                    <button className="w-30 h-10 bg-[#f5ba13] m-3 rounded text-white ml-auto mt-10" onClick={submitNote}>Submit</button>
            </div>
            
        </div>
      
    </div>
  )
}
