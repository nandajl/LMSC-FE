import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cleanDateTime } from '../../../../../utils/viewClean';

export default function DetailTest() {

  const { id } = useParams();
  const [test, setTest] = useState("")
  const [dateTime, setDateTime] = useState(new Date())

  const navigate = useNavigate();

  async function handleGetTest() {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/test/${id}`);
      setTest(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetTest();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAssinment = () => {
    navigate('/test/assignment/' + id, { state: test.time });
  }

  return (
    <div className='flex flex-col justify-center h-full text-center'>
      <div className='w-2/4 mx-auto rounded-3xl bg-blue-200 p-10 shadow-lg'>
        <p className=' font-bold text-2xl capitalize mb-2'>{test.title} </p>
        <p className=' font-meduim text-lg capitalize mb-5'>{test.description} </p>
        <div className='flex justify-between'>
          <p className='text-base capitalize'>Waktu mulai ujian </p>
          <p className='font-medium'>{cleanDateTime(test.availableFrom)}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-base capitalize mb-5'>Waktu selesai ujian </p>
          <p className='font-medium'>{cleanDateTime(test.availableTo)}</p>
        </div>
        <p className='text-base capitalize mb-5'>Durasi : <span className='font-medium'>{test.time}</span></p>
        {
          dateTime < new Date(test.availableFrom) ? (
            <p className='text-red-500'>Ujian belum tersedia</p>
          ) : dateTime > new Date(test.availableTo) ? (
            <p className='text-red-500'>Ujian telah berakhir</p>
          ) :
          (
            <button onClick={handleAssinment} className='bg-info text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-blue-500'>Mulai</button> 
          )
        }
      </div>
    </div>
  )
}
