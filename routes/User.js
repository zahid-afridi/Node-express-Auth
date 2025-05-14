import express from 'express'
import { Login, Register, VerifyEmail } from '../controllers/userControllers.js'
import validate from '../validations/validate.js'
import { authSchema, EmailSchema_validation, loginSchema } from '../validations/auth.schema.js'


const AuthRoutes=express.Router()

AuthRoutes.post('/user/register',validate(authSchema),Register)
AuthRoutes.post('/user/verifyemail', validate(EmailSchema_validation), VerifyEmail)
AuthRoutes.post("/user/login",validate(loginSchema),Login)



export default AuthRoutes