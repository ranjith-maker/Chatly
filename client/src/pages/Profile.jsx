import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCameraOutline } from "react-icons/io5";
import DP from "../assets/DP.png";
import { IoArrowBackOutline } from "react-icons/io5";
import {useNavigate} from 'react-router-dom'
import { useState } from "react";
import { setUserData } from "../redux/userSlice";
import axios from 'axios'


export default function Profile() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user)


const initialState ={
userName : userData.userName || '',
image:null,
bio : userData.bio || ''
}

const [formdata , setFormData] = useState(initialState)
const [preview, setPreview] = useState(userData.image || DP)
const [saving, setSaving] = useState(false)

const handleForm = (ev)=>{

const {name, value} = ev.target

setFormData((prev)=>{
  return{
    ...prev , [name] : value
  }
})

}

const handleImage =(ev)=>{

  const file = ev.target.files[0]

  if(!file) return 


  setFormData((prev)=>{
    return{
      ...prev , image : file
    }
  })

  setPreview(URL.createObjectURL(file))

}


async function editProfile(ev) {
  
ev.preventDefault()
setSaving(true)

 
try {
let url = import.meta.env.VITE_BASE_URL
const data = new FormData

data.append('userName', formdata.userName )
data.append('bio', formdata.bio )

if(formdata.image){
  data.append('image', formdata.image)
}


const response = await axios.patch(url + '/api/edit-profile',
  data,
  {withCredentials : true,
  headers:{
    'Content-type' : 'multipart/form-data',
  },  })

const updateUser = response.data
dispatch(setUserData(updateUser))
setSaving(false)

console.log(response.data);


} catch (err) {
  
console.log(err?.response?.data?.message);
setSaving(false)

}

}



  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div  className="fixed top-5 left-5  "  onClick={()=> navigate('/')  }   >
           <IoArrowBackOutline  className='w-10 h-10  cursor-pointer  '     />
        </div>
         

        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#20c7ff]">
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />


            </div>

            <label
              htmlFor="profileImage"
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#20c7ff] shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
              <IoCameraOutline className="text-2xl   " />
            </label>
               <input type="file" id="profileImage"
               hidden accept='image/*'
               onChange={handleImage}
            
               />

          </div>
        </div>

    
        <h2 className="text-center text-2xl font-bold text-gray-800 mt-6">
          {userData?.userName}
        </h2>


        <form className="mt-8 space-y-5" onSubmit={editProfile}    >

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Username
            </label>

            <input
              type="text" name="userName"
              value={formdata.userName} onChange={handleForm}

              className="w-full border-2 border-[#20c7ff] rounded-lg px-4 py-2 shadow-lg shadow-gray-200  outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Bio
            </label>

            <textarea
              rows={2} name="bio"
              value={formdata.bio} onChange={handleForm}
              placeholder="Write something about yourself..."
              className="w-full border-2 border-[#20c7ff]  rounded-lg px-4 py-2 resize-none shadow-lg shadow-gray-200  outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Save Button */}
          <button 
            type="submit"  disabled={saving}
            className="w-full bg-[#20c7ff] hover:bg-[#20c8ee] text-white shadow-lg shadow-gray-400 active:scale-95 font-semibold py-3 rounded-lg transition">
           {saving ? 'Saving...':' Save Profile' }
          </button>

        </form>
      </div>
    </div>

    
  );
}

