import React from 'react'
import icon_complete from '../assets/img/icon_complete.png'
import icon_24hrs from '../assets/img/icon_24hrs.png'
import icon_professional from '../assets/img/icon_professional.png'

export default function WhyUs() {
  return (
    <div className='w-full px-28 my-16'>
        <p className='text-center font-bold text-5xl'>Why Choose Us?</p>
        <div className='flex justify-between mt-16'>
            <div className='flex flex-col border border-black rounded-large px-12 w-80 h-72 justify-center'>
              <img src={icon_complete} alt="icon complete" className='w-12'/>
              <p className='font-bold text-xl my-4'>Terpercaya</p>
              <p>Kami dipercaya oleh berbagai mitra yang bekerja bersama</p>
            </div>
            <div className='flex flex-col border border-black rounded-large px-12 w-80 h-72 justify-center'>
              <img src={icon_24hrs} alt="icon complete" className='w-12'/>
              <p className='font-bold text-xl my-4'>Efesiensi</p>
              <p>Belajar dimana saja dan kapan saja bersama kami</p>
            </div>
            <div className='flex flex-col border border-black rounded-large px-12 w-80 h-72 justify-center'>
              <img src={icon_professional} alt="icon complete" className='w-12'/>
              <p className='font-bold text-xl my-4'>Terukur</p>
              <p>Dengan penilaian dan sistem pemantauan terukur</p>
            </div>
        </div>
    </div>
  )
}
