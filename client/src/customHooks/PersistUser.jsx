import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'


export default function PersistUser() {

const dispatch = useDispatch()

const {userData} = useSelector(state => state.user)

async function fetchUser() {
    
const url = import.meta.env.VITE_BASE_URL

try {
    
const {data} = await axios.get(url + '/api/view-profile' , {withCredentials : true} )

dispatch(setUserData(data.data))

} catch (err) {
console.log(err.message)
  
}

}

useEffect(()=>{

  if(userData) return;

  fetchUser();

},[userData])

}



/**
 * the effect runs only once when the component mounts. If userData changes later, the effect won't run again.
 * if we leave empty
 * 
 * 
 */

