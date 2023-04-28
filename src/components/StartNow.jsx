import React from 'react'

export default function StartNow() {
  return (
    <div className='flex w-full bg-primary py-28 px-60 justify-between items-center'>
        <div>
            <p className='text-6xl font-bold my-10'>Start Learning Today!</p>
            <p>Bersama kami, mari tingkatkan skill dan bakatmu</p>
        </div>
        <div>
            <button className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-40 '>Mulai</button>
        </div>
    </div>
  )
}
