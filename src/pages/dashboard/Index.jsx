import React, { useContext, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Grup from './Grup/Index'

export const Homepage = () => {

  const [toggledSidebar, setToggledSidebar] = useState(true)

  const path = '/dashboard/home';
  return (
    <div className='flex relative'>
      <div className={toggledSidebar ? 'w-72 fixed' : 'hidden'}>
        <Sidebar />
      </div>
      <div className='w-full h-0'>
        <Navbar toggledSidebar={toggledSidebar} setToggledSidebar={setToggledSidebar} dashboard={true} />
        <div className={`${toggledSidebar ? 'w-4/5 left-72 h-screen bg-slate-100' : 'w-full h-screen bg-slate-100'} relative px-16 pt-20 w-4/5 top-20 -z-10 overflow-hidden }`}>
            <Outlet />
        </div>
      </div>
    </div>

  )
}
