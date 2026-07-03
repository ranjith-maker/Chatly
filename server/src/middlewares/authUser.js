import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import AppError, { catchAsync } from '../utils/CustomError.js'



export const authUser = catchAsync(async(req ,res , next)=>{


const {token} = req.cookies

if(!token){
    throw new AppError('No token exist',400)
}

const decode  = await jwt.verify(token, process.env.JWT_SECRET )


if(!decode){
    throw new AppError('Invalid Token or expired Token' ,400)
}

const user = await User.findById(decode.id)

if(!user){
  throw new AppError('User not found',404)
}


req.user = user

next()


})

