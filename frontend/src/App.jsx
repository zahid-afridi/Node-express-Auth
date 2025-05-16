import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import UserLayouts from './layouts/User/UserLayouts'
import Home from './pages/users/Home'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import AdminLayouts from './layouts/Admin/AdminLayouts'
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'

export default function App() {
  return (
<>

<BrowserRouter>
<Routes>
<Route path='/' element={<UserLayouts/>}>

<Route index element={<Home/>}/>




</Route>
<Route path='/admin/dashboard' element={<AdminLayouts/>}>
 <Route index element={<Dashboard/>}/>
 <Route path='users' element={<Users/>}/>
 



</Route>

<Route path='/login' element={<Login/>}/>  
<Route path='/register' element={<Register/>}/>  

</Routes>


</BrowserRouter>


</>
  )
}
