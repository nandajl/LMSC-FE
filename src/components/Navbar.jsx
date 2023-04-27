import React from 'react'
import lms from '../assets/img/lms-transparant.png'

export default function Navbar() {
  return (
    <div className='flex w-screen justify-between h-20 py-3 px-16 bg-primary'>
        <img src={lms} alt="lms" />
        <div className='flex items-center font-semibold'>
            <ul className='flex me-6'>
                <li className='me-6'><a href="">Service</a></li>
                <li><a href="">About Us</a></li>
            </ul>
            <button className='bg-secondary p-2 float-right text-white text-sm font-bold w-24'>Login</button>

        </div>

    </div>
  )
}

