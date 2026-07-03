import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers, setUserData } from '../redux/userSlice'


export default function GetOtherUser() {

const dispatch = useDispatch()

const {otherUsers} = useSelector(state => state.user)
const {userData} = useSelector(state => state.user)


async function fetchAllUsers() {
    
const url = import.meta.env.VITE_BASE_URL

try {
    
const {data} = await axios.get(url + '/api/get-others' , {withCredentials : true} )
console.log(data);

dispatch(setOtherUsers(data.data))



} catch (err) {
console.log(err.message)
    

}

}

useEffect(()=>{

  if (!userData) return;      // Don't fetch until logged in
  if (otherUsers) return;     // Already fetched


  fetchAllUsers();

},[userData])

}








