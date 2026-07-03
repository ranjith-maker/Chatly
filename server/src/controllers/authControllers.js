import User from '../models/UserModel.js'
import AppError, {catchAsync} from '../utils/CustomError.js'
import bcrypt from 'bcrypt'
import validator from 'validator'


export const signUp = catchAsync(async(req , res , next)=>{

 
const {userName, email, password} = req.body

if(!userName || !email  || !password){
    throw new AppError('Invalid Fields  ',400)
}

const checkbyName = await User.findOne({userName})

if(checkbyName){
    throw new AppError('username already exist',400)
}

//what if diff name and same email so checking here email as well
const checkbyMail = await User.findOne({email})

if(checkbyMail){
    throw new AppError('Email ID already exist',400)
}


if(!validator.isStrongPassword(password)){
    throw new AppError('Password should contain, 1Caps, 1Low, 1no. 1symbol',400)
}

const hashPass = await bcrypt.hash(password,12)

const user = await User.create({ userName , email, password : hashPass })

const token = user.getJWTToken()

res.cookie('token', token, {

httpOnly: true,
secure : true,
sameSite : 'none',
maxAge : 7*24*60*60*1000

})

user.password = undefined

return res.status(201).json({
    success : true,
    message : 'New User is created',
    user
})


})


export const login = catchAsync(async(req,res,next)=>{


const {email, password} = req.body

if(!email || !password){
    throw new AppError('Invalid Field',400)
}

const user = await User.findOne({email}).select('+password')

if(!user){
    throw new AppError('Email ID is not exist, go Signup ',404)
}

const checkPass = await bcrypt.compare(password, user.password)

if(!checkPass){
    throw new AppError('Incorrect email or password',400)
}

const token = user.getJWTToken()

res.cookie('token', token ,{
    httpOnly: true,
    secure : true,
    sameSite : 'none',
    maxAge : 7*24*60*60*1000
})

user.password = undefined

return res.status(200).json({
    success : true,
    message : 'User Loggedin Successfully',
    data :user
})



})


export const getProfile = catchAsync(async(req,res,next)=>{

const user = req.user

return res.status(200).json({
success : true,
message : 'Fetched user profile',
data : user

})


})




export const logout = catchAsync(async(req,res,next)=>{

res.cookie('token', null,{
    expires:  new Date(Date.now())
})


return res.status(200).json({
    success : true,
    message : 'Successfully logged out'
})

})






