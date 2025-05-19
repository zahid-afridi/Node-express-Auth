import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import DbCon from './controllers/db.js'
import AuthRoutes from './routes/User.js'
import './middlewares/passport/googleStrategy.js'
import ItemsRoutes from './routes/Items.js'


dotenv.config()

// db connection 
DbCon()


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
app.use('/api',AuthRoutes)
app.use('/api',ItemsRoutes)

app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(PORT,()=>{
    console.log(`Server is running of PORT ${PORT}`)
})






