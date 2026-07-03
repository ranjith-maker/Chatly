
import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBackOutline  } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import DP from "../assets/DP.png";
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { TbSend2 } from "react-icons/tb";
import { IoMdPhotos } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react'; 
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import axios from 'axios';
import { addMessage, } from '../redux/messageSlice';
import { getSocket } from "../utils/socket";
import { CgCloseO, CgCloseR } from "react-icons/cg";

export default function MessageTab() {

const {selectedUser , userData } = useSelector(state => state.user )

const {conversations} = useSelector(state => state.message )

const conversation =
  conversations[selectedUser?._id]?.messages || [];

const [showEmoji, setShowEmoji] = useState(false)
const [msgs , setMsgs] = useState('')
const [backendImg, setBackendImg] = useState(null);
const [preview, setPreview] = useState("");


const dispatch = useDispatch()



function handleMessage(em) {
  
setMsgs(prev => prev + em.emoji)
setShowEmoji(false)

}

function handleImage(ev) {
  
  const file = ev.target.files[0]
  if(!file) return

 setBackendImg(file)                  // actual File object to send to db
 setPreview(URL.createObjectURL(file)); // only for displaying in fend

}

async function handleSendMessage(ev) {
  
ev.preventDefault()

try {
  
const messageData = new FormData
if(msgs.trim()){
  messageData.append('message', msgs )
}


if (backendImg) {
  messageData.append("image", backendImg);
}


const url = import.meta.env.VITE_BASE_URL 

const response = await axios.post(`${url}/api/send-message/${selectedUser._id}`,
  messageData,
  {withCredentials : true,
  })


const newMsg = response.data.data

dispatch(
  addMessage({
    userId: selectedUser._id,
    message: newMsg,
  })
);
 setPreview('')
 setBackendImg(null)
 setMsgs('')
 
} catch (err) {
  console.log("Error :", err);
  
}}


useEffect(() => {
  if (!selectedUser || !userData) return;

  const socket = getSocket();

  const roomId = [userData._id, selectedUser._id]
    .sort()
    .join("-");

  socket.emit("joinChat", roomId);
}, [selectedUser, userData]);



  return (
    <div className={` ${selectedUser ? 'flex' : 'hidden' }   lg:w-[70%]  lg:flex relative w-full h-full bg-slate-400 border-l-2 border-gray-500 ` } >
{selectedUser && 

<div  className='w-full h-full flex flex-col   ' > 
    
      <div className='w-full h-30 bg-[#1797c2] gap-4  rounded-b-[30px] shadow-gray-800 shadow-lg flex items-center' >
          <div onClick={()=>dispatch(setSelectedUser(null))  }  >
             <IoArrowBackOutline  className='w-10 h-7  cursor-pointer  text-white'  />
          </div>
               <div   className='h-12 w-12 rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg ' >
                 <img src={ selectedUser?.image ||  DP}  alt="dp" className='h-16 w-16 object-cover  '   />
               </div> 
       <h1 className='text-black font-semibold  '  > {selectedUser.userName || 'use' } </h1>          
      </div>  

{/* Message showing area here and emoji */}
  <div className='bg-slate-800 flex  flex-col overflow-auto  py-5 px-3 w-full mt-2 h-[72%] border-b-lg lg:h-[65%]  ' >

   {showEmoji && 
   <div className='  absolute bottom-30 left-5 ' >
    < EmojiPicker onEmojiClick={handleMessage}
     width={300}  height={320}  theme='light'  />
   </div>   }  

  {conversation.map((msg)=>(
      msg.sender?.toString() === userData._id?.toString() ? 
        <SenderMessage     key={msg._id} 
         message={msg.message} 
         image={msg.image} preview={preview} setPreview={setPreview}   /> 
      : <ReceiverMessage  key={msg._id}
         message={msg.message} image={msg.image}   />              
  ))  }



  </div>
       
 </div>
      
  }


    {selectedUser && 
        <div className='w-full lg:w-[70%]  h-25 fixed bottom-5 flex 
          justify-center items-center   ' >

          <form   onSubmit={handleSendMessage}
          className=' w-[95%]  lg:w-[70%] bg-[#1797c2] relative px-5 flex items-center gap-4 h-15 rounded-full cursor-pointer shadow-lg shadow-gray-500 ' > 

     {preview &&  (<div>     
            <img src={preview} alt="preview" 
                className='absolute bottom-15 right-15  w-50 h-50 rounded-md ' />
            
            <button 
            onClick={()=> {setPreview(''),  setBackendImg(null)  }}
             
            className='absolute bottom-55 right-15 text-xl  bg-white rounded-full   ' >
            <CgCloseO />
            </button>    


            </div>)
    }
           <div onClick={()=>setShowEmoji(prev => !prev)  }  >
            <RiEmojiStickerLine className='w-6.25 h-6.25 text-white' />
              </div>

            <input type="text"
            placeholder='Send a message here.....'
            onChange={(ev)=> setMsgs(ev.target.value) } 
            value={msgs}

            className=' h-[85%] rounded-full w-full bg-transparent text-white text-xl outline-none  px-10   '
            />
            <div  >
              <label htmlFor="gallery">
                 <IoMdPhotos className='w-6.25 h-6.25 text-white   cursor-pointer'   />
                 </label>
              <input type="file" accept='image/*' hidden id='gallery'
              onChange={handleImage}
              />   
            </div>
           
         { (msgs.trim() || preview) &&  (<button type='submit' >
               <TbSend2 className='w-6.25 h-6.25 text-white  cursor-pointer '  />
            </button>)
          }
          </form>


          </div>
}


          {!selectedUser &&  
          <div  className='w-full h-full flex items-center flex-col justify-center ' >
            <h1 className='text-black font-semibold text-3xl '>
            Welcome to Chatly , </h1> 
            <h1  className='text-gray-500 font-bold text-3xl ' > Start Chatting</h1>
          </div>}


    </div>
  )
}





