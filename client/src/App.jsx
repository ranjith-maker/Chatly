import React, { useEffect } from 'react'
import Login from './pages/Login'
import SignIn from './pages/SignUp'
import { Routes, Route, Navigate } from 'react-router-dom'
import Profile from './pages/Profile'
import PersistUser from './customHooks/PersistUser'
import { useSelector, useDispatch  } from 'react-redux'
import Home from './pages/Home'
import GetOtherUser from './customHooks/getOtherUser'
import { useSocket } from './customHooks/useSocket'


export default function App() {


PersistUser()
GetOtherUser()
useSocket()

const {userData , socket, onlineUsers  } = useSelector(state => state.user )



  return (
    <>     

<Routes>

<Route path='/login' element={ !userData ?  <Login/> : <Navigate to='/'   />   }  />
<Route path='/signup' element={ !userData ?  <SignIn/>: <Navigate to='/profile'    />  }  />
<Route path='/profile' element={ userData ?  <Profile/> :  <Navigate to='/signup' />    }  />
<Route path='/' element={userData ? <Home/>:  <Navigate  to='/login'/>} />

</Routes>

      </>
  )

}



/**
 * Google@10.
 * 
 * let url = import.meta.env.VITE_BASE_URL
useEffect(()=>{
const socket = io(`${url}`, {
  query : {
    
  }
} )

},[])

 */