import React from 'react'
import { Sidebar } from 'flowbite-react'
import lms from '../assets/img/lms.png'
import { Link, NavLink } from 'react-router-dom'

export default function Sidebars() {
  
  return (
    <div className="h-screen bg-primary md:overflow-hidden pt-2">
      <img src={lms} alt="lms" className='w-16 ml-6'/>
      <div className='bg-info pl-6 py-4 mt-20 mb-4 '>
        <Link to='grup'>
          <p className='font-medium'>Grup</p>
        </Link>
      </div>
      <div className='pl-6 py-4 mb-4'>
        <Link to='materi'>
          <p className='font-medium'>Materi</p>
        </Link>
      </div>
      <div className='pl-6 py-4 mb-4'>
        <Link to='test'>
          <p className='font-medium'>Test</p>
        </Link>
      </div>
      <div className='pl-6 py-4 mb-4'>
        <Link to='feedback'>
          <p className='font-medium'>Feedback</p>
        </Link>
      </div>
    </div>
  )
}
