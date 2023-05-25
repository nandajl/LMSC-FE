import React from 'react'
import Navbar from '../../components/Navbar'
import GrupContent from '../../components/content/GrupContent'
import { Outlet, Link } from 'react-router-dom'

export default function Grup() {
  return (
    <>
      <Navbar/>
      <div className='flex divide-x-2 divide-secondary w-3/4 border border-secondary rounded-3xl lg:rounded-large py-8 lg:py-14 px-7 lg:px-20 my-40 mx-auto overflow-auto no-scrollbar'>
      <div className='pr-8'>
        <Link to='grup'>
          <p className='font-bold text-xl mb-5'>Grup</p>
        </Link>
        <Link to='materi'>
          <p className='font-bold text-xl mb-5'>Materi</p>
        </Link>
        <Link to='test'>
          <p className='font-bold text-xl mb-5'>Test</p>
        </Link>
        <Link to='feedback'>
          <p className='font-bold text-xl mb-5'>Feedback</p>
        </Link>
      </div>
      <div className='pl-8 w-full'>
        <Outlet />
      </div>
    </div>
      
    </>
  )
}
