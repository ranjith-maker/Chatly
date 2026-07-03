import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setSelectedUser,  } from '../redux/userSlice'
import axios from 'axios'
import {getConversation} from '../redux/messageSlice'

export default function GetMessages() {

const {selectedUser, userData } = useSelector(state => state.user )


const dispatch = useDispatch()



async function fetchMessages() {
    
const url = import.meta.env.VITE_BASE_URL
try {
    
const response  = await axios.get(`${url}/api/get-message/${selectedUser._id}`,
     {withCredentials : true}   )

const inboxMsg = response.data.data.messages

dispatch(getConversation({
    userId: selectedUser._id,
    messages: inboxMsg

}))
console.log(inboxMsg)
 

} catch (err) {
    
console.log('Error', err?.response?.data?.message)

}}



useEffect(()=>{

    if( !selectedUser) return 

    fetchMessages()

},[selectedUser])   // we want this to run as the clicked msg ppl is changed



}





















