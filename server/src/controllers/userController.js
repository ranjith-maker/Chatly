
import User from '../models/UserModel.js'
import AppError, { catchAsync } from '../utils/CustomError.js'
import { uploadImagetoCloudinary } from '../utils/ImageUploader.js'


export const getProfile = catchAsync(async(req,res,next)=>{

const user = req.user

return res.status(200).json({
success : true,
message : 'Fetched user profile',
data : user

})


})

export const editProfile = catchAsync(async(req,res,next)=>{


const user = req.user
const {userName, bio} = req.body

Object.keys(req.body).forEach((key)=>{

    user[key] = req.body[key]
    
})

if(req.file){
    const upload_image = await uploadImagetoCloudinary(req.file)
    user.image = upload_image.secure_url

}

await user.save()

return res.status(200).json({
    success : true,
    message : 'Profile Edited Successfully',
    data:user   
})



})


export const getOthers = catchAsync(async(req , res, next)=>{


const users = await User.find({

    _id : {$ne: req.user._id}
})

if(!users){
    throw new AppError('Coudnt fetch all users ' )
}

return res.status(200).json({
    success : true,
    message : 'Fetched all users',
    data : users

})


})




export const searchUsers = catchAsync(async (req, res, next) => {
  
    const { userName } = req.query;

  if (!userName?.trim()) {
    throw new AppError("Search query is required", 400);
  }

const users = await User.find({
  _id: { $ne: req.user._id },
  userName: {
    $regex: userName,
    $options: "i",
  },
})

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });


});


