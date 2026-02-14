import React, {useEffect, useState} from "react";
import Logout from "./Logout";
import axios from "axios";
import { API_URL } from "../API_URL";
axios.defaults.withCredentials = true;
function Header({user, setUser}) {
  console.log(user)
  return (
    <header className="flex items-center bg-[#f5ba13] p-6">
      <h1 className="text-3xl font-bold text-white">Keeper</h1>
      <p className="px-3 ml-4 text-white font-semibold border-1 border-white rounded-xl">{user.username}</p>
      <div className="ml-auto flex">
        
        <Logout setUser={setUser} />
      </div>
    </header>
  );
}

export default Header;
