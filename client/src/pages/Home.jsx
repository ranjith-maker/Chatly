import React from 'react'
import SideBar from '../components/SideBar'
import MessageTab from '../components/MessageTab'
import GetMessages from '../customHooks/GetMessages'

export default function Home() {

   GetMessages()

  return (

    <div className='w-[full]  h-screen flex overflow-hidden  ' >
      <SideBar/>
      <MessageTab/>
    </div>
  )
}
