import React from 'react'
import Navbar from '../../components/Navbar'
import GrupContent from '../../components/content/GrupContent'
import { Outlet, Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin';

export default function Grup() {
  const username = useLogin();

  return (
    <>
      <Navbar/>
      <div className='flex divide-x-2 divide-secondary w-3/4 border border-secondary rounded-3xl lg:rounded-large py-8 lg:py-14 px-7 lg:px-14 my-40 mx-auto overflow-auto no-scrollbar'>
      <div className='pr-8'>
        <Link to='feedback'>
          <p className='font-bold text-xl mb-5 hover:text-secondary'>Feedback</p>
        </Link>
      </div>
      <div className='pl-8 '>
        <Outlet />
      </div>
    </div>
      
    </>
  )
}
