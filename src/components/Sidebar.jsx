import React from 'react'
import { Sidebar } from 'flowbite-react'
import lms from '../assets/img/lms.png'
import { Link, NavLink } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";

export default function Sidebars(props) {
  
  return (
    <div className="min-h-screen bg-primary md:overflow-hidden pt-2 ">
      <Link to={'/'}>
        <img src={lms} alt="lms" className='hover:animate-spin w-16 ml-6'/>
      </Link>
      <div className=' pl-6 py-4 mt-20 mb-4 hover:bg-info'>
        <Link to='grup'>
          <p className='font-medium '>Grup</p>
        </Link>
      </div>
      <div className='pl-6 py-4 mb-4 hover:bg-info'>
        <Link to='materi'>
          <p className='font-medium'>Materi</p>
        </Link>
      </div>
      <div className='pl-6 py-4 mb-4 hover:bg-info'>
        <Link to='test'>
          <p className='font-medium'>Test</p>
        </Link>
      </div>
      <div className='pl-6 py-4 mb-4 hover:bg-info'>
        <Link to='feedback'>
          <p className='font-medium'>Feedback</p>
        </Link>
      </div>
      <div className='pl-6 py-4 mb-4 hover:bg-info'>
        <Link to='company'>
          <p className='font-medium'>Company</p>
        </Link>
      </div>
    </div>
  )
}
