import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import Logo from '../../../assets/Images/logo.png';
export default function UserSidebar() {
  return (
   <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div>
        
          <div className="flex items-center justify-start h-16   px-2">
            <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center">
              
            <img src={Logo} alt="" />
            </div>
          </div>

         
          <nav className="mt-6 px-2 space-y-1">
            <a href="#" className="flex items-center px-4 py-2 bg-gray-800 rounded-md text-white">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-md">
              👥 Team
            </a>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-md">
              📁 Projects
            </a>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-md">
              🗓️ Calendar
            </a>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-md">
              📄 Documents
            </a>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-md">
              📊 Reports
            </a>
          </nav>

          
          <div className="mt-6 px-4 text-sm text-gray-400">Your teams</div>
          <ul className="mt-2 px-4 space-y-2 text-sm">
            <li>
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="bg-gray-800 text-xs rounded-full px-2 py-0.5 mr-2">H</span>Heroicons
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="bg-gray-800 text-xs rounded-full px-2 py-0.5 mr-2">T</span>Tailwind Labs
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="bg-gray-800 text-xs rounded-full px-2 py-0.5 mr-2">W</span>Workcation
              </a>
            </li>
          </ul>
        </div>

       
        <div className="p-4">
          <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white">
            ⚙️ <span className="ml-2">Settings</span>
          </a>
        </div>
      </aside>
  );
}
