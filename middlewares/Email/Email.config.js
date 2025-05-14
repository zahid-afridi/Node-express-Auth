
import nodemailer from 'nodemailer'


const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    secure:false,
    port:587,
    auth:{
   
        user:`zahidtime313@gmail.com`,
        pass: 'rlsh llyn oxkc dsjj',
    }
})

export default transporter
