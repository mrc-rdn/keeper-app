import React, {useEffect, useState} from "react";
import Logout from "./Logout";
import axios from "axios";
import { API_URL } from "../API_URL";
axios.defaults.withCredentials = true;
function Header({user, setUser}) {
  // const [data, setData] = useState(null)
 
  //   const fecthData = async()=> {
  //       try {
  //           const res = await axios.get(`${API_URL}/protectedroute`, {withCredentials: true})
  //           console.log(res.data)
  //           setData(res.data.user)
  //       } catch (error) {
            
  //       }
  //   }
  //   useEffect(()=>{
  //     fecthData()
  //   },[])
  console.log(user)
  return (
    <header className="flex items-center">
      <h1 className="text-xl font-bold">Keeper</h1>
      <p className="px-3 ml-4 text-white font-semibold border-1 border-white rounded-xl">{user.username}</p>
      <div className="ml-auto flex">
        
        <Logout setUser={setUser} />
      </div>
    </header>
  );
}

export default Header;
