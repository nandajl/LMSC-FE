import React from 'react'
import manageable from '../assets/img/manageable.png'
import monitor from '../assets/img/monitor2.png'
import review from '../assets/img/review.png'

export default function OurCommitment() {
  return (
    <div className='flex m-40 p-14 bg-secondary text-white justify-between'>
        <div className='my-auto w-1/2'>
            <p className='text-6xl font-bold'>OUR COMMITMENT</p>
            <p className='mt-9'>Kami berupaya untuk memberikan pengalaman belajar yang terbaik 
              bagi perusahaan dan pegawai anda. </p>
        </div>
        <div>
            <div className='flex text-center'>
              <div className='me-9'>
                <img src={manageable} alt="manageable" className='w-48'/>
                <p className='mt-2 font-semibold'>Pengelolaan <br /> yang mudah</p>
              </div>
              <div className=''>
                <img src={monitor} alt="manageable" className='w-48'/>
                <p className='mt-2 font-semibold'>Pengelolaan <br /> yang mudah</p>
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <img src={review} alt="review" className='w-48'/>
              <p className='mt-2 font-semibold'>Pengelolaan <br /> yang mudah</p>
            </div>
        </div>
    </div>
  )
}
