import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../API_URL';
import { useNavigate } from 'react-router-dom';



const AuthPage = ({setUser}) => {
  const [error , setError]  = useState("")
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }else{
        const res = await axios.post(`${API_URL}/api/auth/register`,{username: formData.username, password: formData.password},{withCredentials:true} )
      
        setFormData({
          username: '',
          password: '',
          confirmPassword: ''
        })
        navigate('/login')
        console.log(res)
        
      }
    } catch (error) {
      console.log(error)
       setError("Invalid email or password")
    }
    
   
  };

  return (
    <div className=" w-full h-screen grid place-items-center">
      <div className="w-10/12 h-10/12 md:w-8/12 xl:w-6/12 p-10 bg-[#f5ba13] rounded-xl shadow-md relative">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Account
        </h2>
        <p className='text-center text-red-600 m-3 absolute left-67 top-20'>{error}</p>
        <div className="space-y-6">
          <div className='m-5'>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>

          <div className='m-5'>
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

          
          <div className="m-5">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
         
          <div className='m-10'>
            <button
              onClick={handleSubmit}
              className="w-full bg-white p-5 rounded-xl transition duration-500 hover:scale-105 hover:text-[#f5ba13]"
            >
              Register
            </button>

          </div>
          
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-blue-800 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;