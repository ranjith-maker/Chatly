import express from 'express'

import { getProfile } from '../controllers/authControllers.js'
import { authUser } from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
import { editProfile, getOthers, searchUsers } from '../controllers/userController.js'


const userRouter = express.Router()


userRouter.get('/view-profile', authUser, getProfile)
userRouter.patch('/edit-profile', authUser, upload.single('image') , editProfile   )

userRouter.get('/get-others' ,authUser, getOthers )
userRouter.get('/search' , authUser, searchUsers  )

export default userRouter












