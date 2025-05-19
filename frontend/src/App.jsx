import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import UserLayouts from './layouts/User/UserLayouts'
import Home from './pages/users/Home'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import AdminLayouts from './layouts/Admin/AdminLayouts'
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import AddItem from './pages/users/AddItem'
import MyPickups from './pages/users/MyPickups'
import PickupManagement from './pages/admin/PickupManagement'
import WarehouseManagement from './pages/admin/WarehouseManagement'
import PaymentManagement from './pages/admin/PaymentManagement'
import ErrorPage from './pages/ErrorPage'

export default function App() {
  return (
<>

<BrowserRouter>
<Routes>
<Route path='/' element={<UserLayouts/>}>

<Route index element={<Home/>}/>
 <Route path='Additem' element={<AddItem/>}/>
 <Route path='myPickups' element={<MyPickups/>}/>





</Route>
<Route path='/admin/dashboard' element={<AdminLayouts/>}>
 <Route index element={<Dashboard/>}/>
 <Route path='users' element={<Users/>}/>
 <Route path='Pickup-Management' element={<PickupManagement/>}/>
 <Route path='Warehouse-Management' element={<WarehouseManagement/>}/>
 <Route path='Payment-Management' element={<PaymentManagement/>}/>
 



</Route>

<Route path='/login' element={<Login/>}/>  
<Route path='/register' element={<Register/>}/>  

<Route path='*' element={<ErrorPage/>}/>
</Routes>


</BrowserRouter>


</>
  )
}
