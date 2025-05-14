import express from 'express'
import dotenv from 'dotenv'
import DbCon from './controllers/db.js'
import AuthRoutes from './routes/User.js'
import cors from 'cors'

dotenv.config()

// db connection 
DbCon()

const PORT=process.env.PORT
const app=express()
app.use(express.json())
app.use(cors())


app.use('/api',AuthRoutes)
app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(PORT,()=>{
    console.log(`Server is running of PORT ${PORT}`)
})






