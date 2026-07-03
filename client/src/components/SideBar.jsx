
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DP from "../assets/DP.png";
import { GrSearch } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers, setSelectedUser, setUserData } from '../redux/userSlice';


export default function SideBar() {
  

const {userData , otherUsers , selectedUser,onlineUsers } = useSelector(state => state.user )



const navigate = useNavigate()
const dispatch = useDispatch()
  
async function handleLogout() {

let url = import.meta.env.VITE_BASE_URL
  const response = await axios.post(url + '/api/logout-user', {}, {withCredentials :true}  )
  dispatch(setUserData(null))
  dispatch(setOtherUsers(null))
  return navigate('/login')
}




const activeUsers = otherUsers?.filter((users)=> onlineUsers?.includes(users._id)  )



    return (
      <>   
    <div className={` ${ !selectedUser ? 'block' : 'hidden'} lg:block  lg:w-[30%] w-full h-full bg-slate-400   `} >

         <div onClick={handleLogout} 
           className='fixed bottom-5 left-5  w-16 h-12 rounded-full mt-3 z-10 text-gray-700 cursor-pointer bg-[#20c7ff]  hover:bg-slate-200 flex justify-center items-center shadow-gray-500 shadow-lg ' >
           <BiLogOutCircle className='h-7.25  w-7.25  '   />
        </div>
        
   
 <div className='w-full h-60 bg-[#20c7ff] rounded-b-[30%] shadow-gray-800 shadow-lg flex flex-col justify-center px-5  ' >

<div className='w-full flex justify-between items-center  h-[30%] '  >  
        <h1 className='text-white font-semibold text-[25px]  ' > Wassup <span className='text-gray-800 font-bold ' > .....   {userData.userName} 👋🏻 </span> </h1>
        <div  onClick={()=> navigate('/profile')}
        className='w-16 h-16 rounded-full overflow-hidden flex  cursor-pointer justify-center items-center shadow-gray-500 shadow-lg ' >
            <img src={userData.image || DP}  alt="dp" className='h-full w-full object-cover  '   />
        </div>

</div>
    <div>     
        { activeUsers?.map((user)=>{
          return   <div  key={user._id} 
                     onClick={()=> dispatch(setSelectedUser(user))}
          
          className='w-12 h-12 mt-10 relative rounded-full cursor-pointer flex  flex-col justify-center items-center ' >
                <img src={user?.image || DP}  alt="dp" className='h-full w-full object-cover rounded-full shadow-lg shadow-gray-500   '   />
                <span className='h-3 w-3  bg-[#22f313] rounded-full absolute bottom-2  left-7 shadow-2xl shadow-gray-500 '  >  </span>

                <h1> {user.userName} </h1>
                  </div>
        })}
         </div> 
          </div>

      <div className=' w-full h-[60vh] mt-5 flex flex-col gap-5 relative items-center overflow-auto ' >   
          {otherUsers?.map((user,idx)=>{
          return <div  key={idx} onClick={()=> dispatch(setSelectedUser(user)) }
           className='w-[95%] h-15 bg-white flex  items-center gap-5 hover:bg-gray-300 cursor-pointer shadow-gray-500 shadow-lg rounded-full     ' >
           <div   className='h-15 w-16 rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg' >
            <img src={user?.image || DP}  alt="dp" className='h-16 w-16 object-cover  '   />
            </div> 
            <h1 className='text-black font-semibold  '  > {user?.userName}   </h1>

           </div>   
       
        })}  
         </div>       
  </div>
    </>
  )
  
}
