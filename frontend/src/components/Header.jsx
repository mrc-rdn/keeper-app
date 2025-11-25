import React from "react"
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

function Header(){
    return (
        <div className="Header">
           <PlaylistAddCheckIcon  className="logo"/> <h1>To-do List</h1>
        </div>
    )
}

export default Header;