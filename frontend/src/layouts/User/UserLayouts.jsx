import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from '../../components/users/SideBar/UserSidebar'
import UserNav from '../../components/users/Navbar/UserNav'

export default function UserLayouts() {
  return (
   <>
   <div className="flex h-screen overflow-hidden">
         <UserSidebar/>
          <div className="flex flex-col flex-1 overflow-hidden">
              
                 <UserNav/>
                  <main className="flex-1 overflow-y-auto p-6">
       <Outlet/>
         
        </main>
                 </div>
    

   </div>
   
   </>
  )
}
