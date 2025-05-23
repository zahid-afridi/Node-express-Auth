import express from 'express'
import { Dashbarod } from '../../controllers/Admin.js'
import { isAdmin } from '../../middlewares/IsAdmin.js'


const AdminRoutes=express.Router()

AdminRoutes.get('/dashboard',isAdmin,Dashbarod)

export default AdminRoutes