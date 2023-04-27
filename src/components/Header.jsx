import React, { Component } from 'react'
import work from '../../src/assets/img/work.png'

export default class Header extends Component {
  render() {
    return (
      <div className='flex px-16 w-screen justify-between bg-primary pb-16'>
        <div className='flex flex-col justify-center'>
          <p className='text-6xl font-bold'>Grown Your Skill Now <br/> With Us</p>
          <p className='text-xl font-bold mt-8 mb-24'>Belajar bersama, berkembang bersama. jadilah SDM unggul <br /> bagi perusahaan.</p>
          <button className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-40 '>Mulai</button>
        </div>
        <img src={work} alt="work" style={{height:"33rem"}}/>
      </div>
    )
  }
}
