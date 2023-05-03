import React from 'react'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Grup() {
  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Grup</p>
        <Link to='create'>
          <AiOutlinePlusSquare className='text-5xl'/> 
        
        </Link>
      </div>

    </div>
  )
}
