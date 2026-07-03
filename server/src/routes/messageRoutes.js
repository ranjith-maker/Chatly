import express from 'express'
import {authUser} from '../middlewares/authUser.js'
import { getMessage, sendMessage } from '../controllers/MessageController.js' 
import upload from '../middlewares/multer.js'



const messageRouter = express.Router()


messageRouter.post('/send-message/:receiverId', authUser, upload.single('image')  ,sendMessage )
messageRouter.get('/get-message/:receiverId', authUser ,getMessage )



export default messageRouter





