import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../API_URL';
import { useNavigate } from 'react-router-dom';



axios.defaults.withCredentials = true;

const AuthPage = ({setUser}) => {
  const [error , setError]  = useState("")
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      
        const res = await axios.post(`${API_URL}/api/auth/login`,formData)
        setUser(res.data.user)
        
        navigate("/")
    } catch (error) {
      console.log(error)
      setError("Invalid email or password")
    }
    
   
  };

  return (
    <div className=" w-full bg">
      <div className="">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome to Keeper
        </h2>
        <p className='text-center text-red-500 m-3'>{error}</p>
        <div>
          <div>
            <label className=" text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>



          <button
            
            className=""
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/register")}
            className="text-sm text-blue-600 hover:underline"
          >
             "Don't have an account? Register"
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;