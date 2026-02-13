import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../API_URL'

axios.defaults.withCredentials = true;
export default function Logout() {
    const [isModal , setIsModal] = useState(false)
    const navigate = useNavigate()
    const handleLogout = async ()=>{
        try {
            const res = await axios.post(`${API_URL}/keeper/logout`,{},{withCredentials:true})
            navigate(res.data.redirectTo)
        } catch (error) {
            console.log(error)
        }
    }
  return (<div>
     <button className='text-white'
      onClick={()=>{setIsModal(true)}}
     >
        Log Out
     </button>
    {isModal
        ?<div className='absolute bg-black/20 backdrop-blur w-full h-full inset-0 grid place-items-center z-1000 '>
            <div className='w-100 h-40 bg-white rounded-xl shadow-md'>
                <p className=' text-center p-5'>Are you Sure</p>
                <div className=' w-full flex justify-center gap-10 '>
                    <button 
                        className='p-5 px-10 rounded-xl bg-red-500'
                        onClick={handleLogout}
                    >
                        Yes
                    </button>
                    <button 
                        className='p-5 px-10 rounded-xl bg-[#f5ba13]'
                        onClick={()=>{setIsModal(false)}}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
        :null
        }
  </div>
   
  )
}
