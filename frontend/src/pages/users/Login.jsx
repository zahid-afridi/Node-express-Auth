  import React from 'react';
  import { FaGoogle, FaApple } from 'react-icons/fa';

  export default function Login() {
    return (
      <div className="min-h-screen w-full bg-[#1b1037] flex items-center justify-center px-4">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl px-10 py-12 w-full max-w-md text-white relative">

          {/* Header */}
          <h2 className="text-4xl font-extrabold text-center mb-8 drop-shadow-md">
            Welcome Back
          </h2>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          {/* Password Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white transition"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 cursor-pointer">
                👁️
              </span>
            </div>
          </div>

          {/* Or Divider */}
          <div className="text-center text-white/60 mb-6 relative">
            <hr className="border-t border-white/30" />
            <span className="absolute bg-[#1b1037] px-3 left-1/2 -translate-x-1/2 top-[-12px] text-sm">
              or
            </span>
          </div>

          {/* Social Buttons */}
          <button className="w-full flex items-center justify-center gap-2 bg-white text-[#333] py-3 rounded-xl mb-4 hover:bg-gray-100 transition font-semibold shadow-md">
            <FaGoogle /> Login with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-white text-[#333] py-3 rounded-xl mb-6 hover:bg-gray-100 transition font-semibold shadow-md">
            <FaApple /> Login with Apple
          </button>

          {/* Login Button */}
          <button className="w-full bg-[#b152ee] text-white font-bold py-3 rounded-xl hover:bg-[#a343e5] transition shadow-lg">
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-white/80 mt-6">
            Don’t have an account?{' '}
            <span className="text-white font-semibold underline cursor-pointer hover:text-[#ffe2ff]">
              Register
            </span>
          </p>
        </div>
      </div>
    );
  }
