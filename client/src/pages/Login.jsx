import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserData } from '../redux/userSlice'
import { useSelector } from 'react-redux'


export default function Login() {

const navigate = useNavigate()
const dispatch = useDispatch()

const [passhow, setpasShow] = useState(false)

const initialState = {
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



async function handleLogin(ev) {
  
ev.preventDefault()
setLoading(true)

let url = import.meta.env.VITE_BASE_URL

try {
  
const response = await axios.post(url + '/api/login-user',

formData , {withCredentials :true}  )


setLoading(false)

dispatch(setUserData(response.data.data))
return navigate('/profile')

} catch (err) {
console.log(err.message);
setShowErr(err?.response?.data?.message)

}}


  return (
    <div className='w-full h-screen bg-slate-400 flex justify-center items-center  ' >
      
      <div className='w-full max-w-125 h-150 bg-white rounded-xl shadow-gray-800 shadow-lg flex flex-col gap-8' >

          <div className='w-full h-50 bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex justify-center items-center  ' >
             <h1 className='text-gray-600 font-bold text-xl'> Welcome to  <span className='text-white' > Chatly </span> </h1>
          </div>
            <h1  className='text-gray-600 font-bold text-center text-xl' > 
              Login Now  </h1>


            <form onSubmit={handleLogin}
            className='w-full flex flex-col justify-center items-center gap-4'>

   
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
    
              <button  disabled={loading}
              className='px-7 py-2.5 cursor-pointer bg-[#20c7ff] rounded-lg text-gray-800 font-semibold shadow-gray-600 shadow-lg  hover:shadow-inner ' > 
                {loading ? 'logging...' : 'login'} </button>

              <p className='mt-5'  > New User ? <span onClick={()=>navigate('/signup')}
               className='underline text-[#20c7ff] hover:cursor-pointer font-bold  ' > Signup  </span> </p>

           </form>
      </div>
  
      </div>
  )

}

