import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_URL } from '../../API_URL.js'
import { Navigate } from 'react-router-dom'

const api = axios.create({
  baseURL: "http://3.1.81.248:3000",
  withCredentials: true // THIS IS THE KEY
});

export default function ProtectedRoute({children}) {
    const [isAuth, setIsAuth] = useState(null)

    const fecthAuth = async()=> {
        try {
            const res = await axios.get(`${API_URL}/protectedroute`, {withCredentials:true})
            console.log(res.data)
            setIsAuth(res.data.success)
        } catch (error) {
            setIsAuth(false)
        }
    }
    useEffect(()=>{
        fecthAuth()
    },[])
   if(isAuth === null) return <p>...Loading</p>

  return isAuth? children : <Navigate to='/' replace />;;
  
}
