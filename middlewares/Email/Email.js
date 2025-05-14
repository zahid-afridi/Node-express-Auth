
import transporter from "../Email/Email.config.js"


const sendVerficationEmail = async (email, verificationCode) => {

    
    try {
      await transporter.sendMail({
            from: `"RETURNBUDDIES" ${process.env.Email_Sender}`,
            to: email,
            subject: "Verify your Email",
            text: "Verify your Email",
            html: `<h1>${verificationCode}</h1>`,
        });

        
        return { success: true };
    } catch (error) {
        console.log("Email error", error);
        return {
            success: false,
            message: "Email not sent",
            error,
        };
    }
};

export default sendVerficationEmail 
