import React, { Component, useEffect } from 'react'
import work from '../../src/assets/img/work.png'
import { Link } from 'react-router-dom'

export default function Header() {

  return (
    <div className='px-10 mt-14 md:px-16 w-screen justify-between bg-primary pb-16 md:flex '>
      <div className='flex flex-col justify-center pt-8'>
        <p className='text-4xl lg:text-6xl font-bold'>Grown Your Skill Now With Us</p>
        <p className='text-xl font-bold mt-8 mb-10 lg:mb-24'>Belajar bersama, berkembang bersama. jadilah SDM unggul <br /> bagi perusahaan.</p>
        <Link to='/dashboard/matkul' >
          <button className='bg-secondary rounded-full py-4 px-8 text-white text-xl font-bold  '>Mulai Disini</button>
        </Link>
      </div>
      <img src={work} alt="work" className='h-80 lg:h-100' />
    </div>
  )

}
