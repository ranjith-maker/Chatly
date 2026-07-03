import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import validator from 'validator'


const UserSchema = new mongoose.Schema({

userName:{
    type : String,
    trim :true,
    required : true,
    unique : true
},
email :{
    type: String,
    unique: true,
    lowercase : true,
    required : true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is not valid',value)
    }}
},
  

password : {
    type: String,
    required : true,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error('Password is not valid',value)
    }},
    select : false
},


image: {
    type: String,
    default : ''
},

bio : {
    type : String,
    maxLength : 50
}



},{timestamps:true})




UserSchema.methods.getJWTToken = function (){

const paylaod = {
    id : this._id,
}

const token = jwt.sign(paylaod , process.env.JWT_SECRET, {expiresIn : '7d' } )

return token 

}




export default mongoose.model('User', UserSchema)



