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
      <div className=' pl-6 py-4 mt-20 mb-3 hover:bg-info'>
        <Link to='user'>
          <p className='font-medium '>User</p>
        </Link>
      </div>
      <div className='pl-6 py-4 mb-3 hover:bg-info'>
        <Link to='matkul'>
          <p className='font-medium'>Mata Kuliah</p>
        </Link>
      </div>
    </div>
  )
}
