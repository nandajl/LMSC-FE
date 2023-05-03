import React from 'react'
import icon_facebook from '../assets/img/icon_facebook.png'
import icon_instagram from '../assets/img/icon_instagram.png'
import icon_twitter from '../assets/img/icon_twitter.png'
import icon_twitch from '../assets/img/icon_twitch.png'

export default function Footer() {
  return (
    <div>
      <div className='lg:flex mt-5 px-16 lg:px-44 mb-10'>
        <div className=''>
          <p className='font-bold text-lg mb-1'>LMS</p>
          <p className='mb-1'>Bandung</p>
          <p className='mb-1'>080990009988</p>
          <p className='mb-1'>lms@mail.com</p>
        </div>
        <div className='my-5 lg:my-0 lg:mx-60'>
          <p className='font-bold text-lg mb-1'>About Us</p>
          <p className='font-bold text-lg mb-1'>Services</p>
          <p className='font-bold text-lg mb-1'>Features</p>
          <p className='font-bold text-lg mb-1'>Blog</p>
          <p className='font-bold text-lg mb-1'>FAQ</p>
        </div>
        <div>
          <p className='font-bold text-lg mb-3'>Connect With Us</p>
          <div className='flex'>
            <div className='me-3'>
              <div className='flex items-center'>
                <img src={icon_facebook} alt="icon_facebook" className='me-2'/>
                <p>Facebook</p>
              </div>
              <div className='flex items-center mt-2'>
                <img src={icon_instagram} alt="icon_instagram" className='me-2'/>
                <p>Instagram</p>
              </div>
            </div>
            <div>
              <div className='flex items-center'>
                <img src={icon_twitter} alt="icon_twitter" className='me-2'/>
                <p>Twitter</p>
              </div>
              <div className='flex items-center mt-2'>
                <img src={icon_twitch} alt="icon_twitch" className='me-2'/>
                <p>Twitch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='px-28'>
        <div className='border-t-2 border-black text-center p-6'>
          @2023 LMS
        </div>
      </div>
    </div>
  )
}
