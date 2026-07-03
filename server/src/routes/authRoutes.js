
import express from 'express'
import { signUp, login , logout, getProfile } from '../controllers/authControllers.js'
import { authUser } from '../middlewares/authUser.js'


const authRouter = express.Router()


authRouter.post('/signup-user', signUp )

authRouter.post('/login-user', login )

authRouter.get('/get-profile' , authUser,getProfile )

authRouter.post('/logout-user', logout)

export default authRouter




