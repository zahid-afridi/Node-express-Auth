import React from 'react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { HiOutlineBookmark } from 'react-icons/hi2';
import Logo from '../../assets/Images/Logo.png'
export default function Login() {
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
          Welcome back
        </h2>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-black mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
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
              className="w-full px-4 py-3 pr-10 rounded-xl bg-[#f4f4f4] placeholder:text-gray-400 text-black focus:outline-none"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              👁️
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-sm text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social logins */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl mb-4 text-black font-medium hover:bg-gray-100 transition">
          <FaGoogle /> Login with Google
        </button>
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl mb-6 text-black font-medium hover:bg-gray-100 transition">
          <FaApple /> Login with Apple
        </button>

        {/* Login */}
        <button className="w-full bg-gradient-to-r from-[#b152ee] to-[#d28bff] text-white font-bold py-3 rounded-full hover:opacity-90 transition mb-4">
          Login
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <span className="text-[#b152ee] font-semibold hover:underline cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
