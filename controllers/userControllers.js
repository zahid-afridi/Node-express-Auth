import UserModel from "../models/User.js"
import bcrypt  from "bcryptjs"
import crypto from "crypto"
import sendVerficationEmail from "../middlewares/Email/Email.js"

import jsonwebtoken from "jsonwebtoken"




const Register=async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                status:400,
                message:"User already exists"
            })
        }


        const hasepassword=await bcrypt.hashSync(password,10)
           const verificationToken = crypto.randomInt(1000, 9999).toString();
        const emailResponse = await sendVerficationEmail(email, verificationToken);
         if (!emailResponse.success) {
            return res.status(500).json({ success: false, message: emailResponse.message || "Failed to send email" });
        }
        const newUser=new UserModel({
            name,
            email,
            password:hasepassword,
            otp:verificationToken
        })
        await newUser.save()
        return res.status(200).json({
            success:true,
            status:200,
            message:`Email hase been send to ${email} Please Verify your Email`,
            user:newUser
        })
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({
            success:false,
            status:500,
            message:"Internal server error"
        })
    }
}


const VerifyEmail=async(req,res)=>{
    const { email,otp } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, status:400, message: "User not found" });
        }
           if (otp !== user.otp) {
            return res.status(400).json({ message: "Invalid OTP",status:400, success:false });
        } 

           user.verified = true;
        user.otp = null;
        user.save()

        return res.status(200).json({ success: true,status:200, message: "Email verified successfully", });
        
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({ success: false, status:500, message: "Internal server error" });
   
        
    }

}

const Login=async(req,res)=>{
    const {email,password}=req.body;

    try {
         const user=await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"User Not Found",status:400,success:false});
        }
        const isMatch=await bcrypt.compareSync(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials", status:400, success:false});
        }
         if(!user.verified){
            const verificationToken = crypto.randomInt(1000, 9999).toString();
               
             await sendVerficationEmail(email, verificationToken);
             await UserModel.findOneAndUpdate({email},{Otp:verificationToken})
            return res.status(400).json({message:  `Please verify your email, email send to ${email}`, status:400, success:false});
        }
        const token=await jsonwebtoken.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
        return res.status(200).json({message:"Login Successfully", status:200, success:true, user,token})
        
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({message:"Internal server error", status:500, success:false})
    }
}
export {Register,VerifyEmail,Login}