import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import DbCon from './controllers/db.js'

import './middlewares/passport/googleStrategy.js'

import router from './routes/index.js'


dotenv.config()

// db connection 


const PORT=process.env.PORT
const app=express()
app.use(express.json())
app.use('/public', express.static('public'));

app.use(cors())

// google login setup
app.use(session({
    secret:"some-secret",
    resave: false,
    saveUninitialized: true,
    
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api',router)

app.get('/',(req,res)=>{
    res.send("Hello World")
})


const startServer = async () => {
  try {
    await DbCon(); // Ensure DB is connected before server starts
    app.listen(PORT, () => {
      console.log(`✅ Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error.message);
    process.exit(1); // Exit the process if DB fails
  }
};

startServer();






