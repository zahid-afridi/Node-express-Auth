import React, { useState } from 'react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { HiOutlineBookmark } from 'react-icons/hi2';
import Logo from '../../assets/Images/Logo.png'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import BaseUrl from '../../service/BaseUrl';
import useAuth from '../../hook/useAuth';
export default function Login() {
  const {login}=useAuth()
  const navigate=useNavigate()
  const [value,setValue]=useState({
    email:"admin@gmail.com",
    password:"12345678"
  })


  const handleLogin=async()=>{
   try {
    const res=await axios.post(`${BaseUrl}/api/user/login`,value)
    const data=res.data
    if (res.status==200 && data.user.role=='admin') {
      login({user:data.user,token:data.token})
      navigate('/admin/dashboard')
      
      toast.success(data.message)
    }else{
      toast.error('Invalid credential')
    }

    
   } catch (error) {
    console.log('erro',error)
     if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Network error or server is unreachable.");
    }
   }
    
    // navigate('/admin/dashboard')

  }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
        
          {/* <h1 className="font-bold text-[#b152ee] text-sm">Returnbuddies</h1> */}
          <img src={Logo} alt="" width={33} height={33}/>
          
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-black mb-8 text-center sm:text-left">
          Login 
        </h2>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-black mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={value.email}
            onChange={(e)=>setValue({...value,email:e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-[#f4f4f4] placeholder:text-gray-400 text-black focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-black mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter password"
              value={value.password}
              onChange={(e)=>setValue({...value,password:e.target.value})}
              className="w-full px-4 py-3 pr-10 rounded-xl bg-[#f4f4f4] placeholder:text-gray-400 text-black focus:outline-none"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              👁️
            </span>
          </div>
        </div>

      
        <button className="w-full bg-gradient-to-r cursor-pointer from-[#b152ee] to-[#d28bff] text-white font-bold py-3 rounded-full hover:opacity-90 transition mb-4" onClick={handleLogin}>
          Login
        </button>

       
      </div>
    </div>
  );
}
