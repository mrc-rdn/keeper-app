import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import KeeperPage from './KeeperPage.jsx'
import Loginpage from "./components/login/Loginpage.jsx";
import CreateAccount  from './components/login/CreateAccount.jsx'
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";

function App() {


  return (
    <div className="">
      <Router future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/Keeper" element={<KeeperPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
