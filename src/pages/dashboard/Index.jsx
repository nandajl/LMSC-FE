import React, { useContext, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Grup from './Grup/Index'

export const Homepage = () => {

  const [toggledSidebar, setToggledSidebar] = useState(false)

  const path = '/dashboard/home';
  return (
    <div className='flex relative'>
  <div className={toggledSidebar ? 'w-72 fixed' : 'hidden'}>
    <Sidebar />
  </div>
  <div className='w-full h-full' style={{ minHeight: '100vh' }}>
    <Navbar toggledSidebar={toggledSidebar} setToggledSidebar={setToggledSidebar} dashboard={true} />
    <div className={`${toggledSidebar ? 'w-4/5 h-screen left-72 flex-grow bg-slate-100' : 'w-full h-full bg-slate-100'} py-32 px-16 w-4/5 top-20 -z-10 }`} style={{ minHeight: '100vh' }}>
      <Outlet />
    </div>
  </div>
</div>

  );
  
}
