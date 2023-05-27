import React, { useContext } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Grup from './Grup/Index'

export const Homepage = () => {

  const path = '/dashboard/home';
  return (
    <div className='flex relative'>
      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white z-1000">
        <Sidebar />
      </div>
      <div className='w-full h-0'>
        <Navbar/>
        <div className='relative left-72 px-16 pt-20 w-4/5 z-0 mt-20 bg-slate-100 h-screen'>
            <Outlet />
        </div>
      </div>
    </div>

  )
}
