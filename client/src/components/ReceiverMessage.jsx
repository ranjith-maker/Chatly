import React from 'react'
import DP from '../assets/DP.png'
import { useRef , useEffect } from 'react'
import { useSelector } from 'react-redux'


export default function ReceiverMessage({message , image}) {


const {selectedUser} = useSelector(state => state.user)


  return (
 <div className="flex items-start gap-2 mb-3">
  <img
    src={selectedUser?.image || DP}
    className="h-8 w-8 rounded-full object-cover"
  />

  <div className="max-w-125 px-5 py-2 bg-[#1797c2] rounded-2xl rounded-tr-none flex flex-col gap-2">
    {image && <img src={image} className="rounded-lg w-37" />}

    {message && <span>{message}</span>}
  </div>
</div>
  
)

}




