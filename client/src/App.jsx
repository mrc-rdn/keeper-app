import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import KeeperPage from './KeeperPage.jsx'
import Loginpage from "./components/login/Loginpage.jsx";
import CreateAccount  from './components/login/CreateAccount.jsx'
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";
import {API_URL} from './API_URL.js'
import axios from "axios";

axios.defaults.withCredentials = true;
const token = localStorage.getItem('token');
function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const res = await axios.get(`${API_URL}/api/auth/me`,{withCredentials:true} );
        console.log(res.data)
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  },[])

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="">
      <Router >
        <Routes>
          <Route path="/login" element={user ?<Navigate to="/" />:<Loginpage setUser={setUser} />} />
          <Route path="/register" element={ <CreateAccount  />} />
          <Route path="/" element={user?<KeeperPage user={user} setUser={setUser} />: <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
