import express from 'express'
import { Login, Register, VerifyEmail } from '../controllers/userControllers.js'
import validate from '../validations/validate.js'
import { authSchema, EmailSchema_validation, loginSchema } from '../validations/auth.schema.js'
import passport from 'passport'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'



const AuthRoutes=express.Router()

AuthRoutes.post('/user/register',validate(authSchema),Register)
AuthRoutes.post('/user/verifyemail', validate(EmailSchema_validation), VerifyEmail)
AuthRoutes.post("/user/login",validate(loginSchema),Login)
// AuthRoutes.get("/user/Login-with-google",async(req,res)=>{
//     const client = new OAuth2Client('YOUR_WEB_CLIENT_ID');
//     const { idToken } = req.body;
//    try {

//       const ticket = await client.verifyIdToken({
//       idToken,
//       audience: 'YOUR_WEB_CLIENT_ID', // same for both app and web
//     });
//        const payload = ticket.getPayload();
//     const { email, name, picture, sub } = payload;
//         const user=await UserModel.findOne({email})
        
//         if(!user){
//             const newUser=new UserModel({
//                 name,
//                 email,
//                 profile:picture,
//                 googleId:sub
//             })
//             await newUser.save()
//             const token=await jsonwebtoken.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
//             return res.status(200).json({message:"User Login successfully", status:200, success:true, user, token})
//         }else{
//             const token=await jsonwebtoken.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
//             return res.status(200).json({message:"User Login successfully", status:200, success:true, user, token})
//         }
//    } catch (error) {
    
//    }
// })

// google logign 

AuthRoutes.get('/user/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback after login
AuthRoutes.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }),
    (req, res) => {
        // You can now send token to frontend
        const user = req.user;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log('googleuser',user)
        console.log('googletoke',token)

        res.status(200).json({message:"User Login successfully",status:200,success:true,user,token})
        // res.redirect(`http://localhost:3000/login/success?token=${token}`)
    }
);


export default AuthRoutes