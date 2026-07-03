import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import ConnectMongoDB from './src/config/DB.js'

import dns from 'dns'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { errorHandler } from './src/utils/CustomError.js'
import authRouter from './src/routes/authRoutes.js'
import userRouter from './src/routes/userRoutes.js'
import cloudinaryConnect from './src/config/Cloudinary.js'
import messageRouter from './src/routes/messageRoutes.js'
import { app, server } from './src/socket/socket.js'





app.use(express.json())
app.use(cookieParser())

app.use(cors({
origin : 'http://localhost:5173',
credentials : true

}))



app.use('/api' , authRouter )
app.use('/api' , userRouter)
app.use('/api', messageRouter )







dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


app.use(errorHandler)

const PORT = process.env.PORT

cloudinaryConnect()
ConnectMongoDB()
.then(()=>{
    console.log('Chatly DB connected');

server.listen(PORT,()=>{
    console.log('Chatly Server is connected on',PORT)
    
})    
}).catch((err)=>{
    console.log('Failed to connect to DB and server')
    
})

