import React from 'react'

export default function StartNow() {
  return (
    <div className='lg:flex w-full bg-primary py-12 lg:py-28 px-14 lg:px-60 justify-between items-center'>
        <div>
            <p className='text-4xl lg:text-6xl font-bold mb-10 lg:my-10'>Start Learning Today!</p>
            <p>Bersama kami, mari tingkatkan skill dan bakatmu</p>
        </div>
        <div>
            <button className='bg-secondary rounded-full p-2 mt-10 lg:mt-0 text-white text-sm font-bold w-40 '>Mulai</button>
        </div>
    </div>
  )
}
