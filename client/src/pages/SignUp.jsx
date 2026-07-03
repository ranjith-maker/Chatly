import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'



export default function SignUp() {

const navigate = useNavigate()
const dispatch = useDispatch()

const [passhow, setpasShow] = useState(false)

const initialState = {
  userName : '',
  email : '',
  password : '',
}

const [ formData , setFormData ] = useState(initialState)

const [showErr , setShowErr] = useState('')
const [loading, setLoading] = useState(false)


function handleData(ev) {
  
  const {name, value} = ev.target 

  setFormData((prev)=>{
    return {
      ...prev , [name] : value
    }
  }) 


}


async function handleSignup(ev) {
  
  ev.preventDefault()
  setLoading(true)

  let url = import.meta.env.VITE_BASE_URL

  try {
  
const response = await axios.post(url + '/api/signup-user', 

formData  , {withCredentials : true} )
setLoading(false)
console.log(response);
dispatch(setUserData(response.data.data))
return navigate('/profile')



} catch (err) {
  console.log("Error: ", err.message);
  setShowErr(response?.data?.err?.message)

  
}


}





  return (
    <div className='w-full h-screen bg-slate-400 flex justify-center items-center  ' >
      
      <div className='w-full max-w-125 h-150 bg-white rounded-xl shadow-gray-800 shadow-lg flex flex-col gap-5' >

          <div className='w-full h-50 bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex justify-center items-center  ' >
             <h1 className='text-gray-600 font-bold text-xl'> Welcome to  <span className='text-white' > Chatly </span> </h1>
          </div>
                     
            <h1  className='text-gray-600 font-bold text-center text-xl' >
             Sign up Now  </h1>


            <form  onSubmit={handleSignup}
            className='w-full flex flex-col justify-center items-center gap-4'>
              
              <input type="text" placeholder='username' 
              name='userName' value={formData.userName} onChange={handleData}              
              className='w-[90%] h-14 outline-none border-[#20c7ff]  border-2 shadow-gray-400 shadow-lg rounded-lg text-center  text-xl '
              />

              <input type="email" placeholder='Email ID'  
               name='email' value={formData.email} onChange={handleData}             
              className='w-[90%] h-14 outline-none border-[#20c7ff]  border-2 shadow-gray-400 shadow-lg rounded-lg text-center  text-xl '
              />

              <div className=' relative w-[90%] h-14 border-[#20c7ff]  border-2 shadow-gray-400 shadow-lg rounded-lg  text-xl' >
                <input type={`${passhow ? 'text' : 'password' }`} placeholder='Passsword' 
                name='password' value={formData.password} onChange={handleData}          
              className='outline-none text-center w-full h-full ' />

              <span onClick={()=>setpasShow((prev)=> !prev  )}
               className='absolute top-2 text-md right-5 cursor-pointer ' > {passhow ? 'hide' : 'show'}  </span>

              </div>

              <p className='text-red-500 font-semibold  ' >{showErr} </p>

              <button disabled={loading}
               className='px-7 py-2.5 bg-[#20c7ff] cursor-pointer active:scale-95 -translate-y-5  rounded-lg text-gray-800 font-semibold shadow-gray-600 shadow-lg  hover:shadow-inner ' > 
               {loading ? 'Signing you...' : 'Signin'}  </button>

              <p> Already have an account ? <span onClick={()=>navigate('/login')}
               className='underline text-[#20c7ff] hover:cursor-pointer font-bold ' > login </span> </p>

           </form>
      </div>

      
      </div>
  )
}
