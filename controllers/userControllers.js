import UserModel from "../models/User.js"
import bcrypt  from "bcryptjs"
import crypto from "crypto"
import sendVerficationEmail from "../middlewares/Email/Email.js"

import jsonwebtoken from "jsonwebtoken"
import ForgotModal from "../models/ForgotPassword.js"




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


// Forgot password
const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        status: 400,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        status: 400,
        success: false,
      });
    }

    const otp = crypto.randomInt(1000, 9999).toString();

    // Send OTP to email
    await sendVerficationEmail(email, otp);

    // Upsert OTP record in ForgotModal
   const expiresAt = new Date(Date.now() + 5 * 60 * 60 * 1000); // 5 hours from now
// const expiresAt = new Date(Date.now() + 10 * 1000); // 10 seconds from now



    await ForgotModal.findOneAndUpdate(
      { email },
      { otp, expiresAt, verified: false },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      message: `OTP has been sent to ${email}`,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
};

const ForgotVerification = async (req, res) => {
  const { email, otp } = req.body;

  try {
 

    const user = await ForgotModal.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User not found",
      });
    }

    // Check if OTP is expired
    if (user.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "OTP has expired",
      });
    }

    // Check if OTP is correct
    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid OTP",
      });
    }

    // OTP is correct and not expired — mark as verified
    user.verified = true;
    user.otp = null;
    user.expiresAt = null;
    await user.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};

const UpdatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {


    // Check if a forgot password request exists and is verified
    const forgotRecord = await ForgotModal.findOne({ email });

    if (!forgotRecord || !forgotRecord.verified) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "OTP verification required before password reset",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });

    // Optionally, delete the forgot record to prevent reuse
    await ForgotModal.deleteOne({ email });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};

export {Register,VerifyEmail,Login,ForgotPassword,ForgotVerification,UpdatePassword}