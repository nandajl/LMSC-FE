import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";

export default function CreateTest() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("")
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");


  function padZero(value) {
    // Menambahkan nol di depan nilai jika nilai kurang dari 10
    return value < 10 ? `0${value}` : value;
  }

  function convertTime(hours, minutes, seconds) {
    // Mengonversi input ke dalam format waktu yang sesuai
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  
    return formattedTime;
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const time = convertTime(hours, minutes, seconds);
      const data = {
        class_id: id,
        title: title,
        description: description,
        time: time,
        availableFrom: availableFrom,
        availableTo: availableTo
      }
      console.log(data);
      const response = await axios.post('http://localhost:8000/api/v1/test', data);
      if (response) {
        navigate('/dashboard/matkul/detail/'+ id)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Test</p>
      </div>
      <div className='bg-white w-full mt-10 px-11 py-8'>
        <form onSubmit={handleSubmit}>
          <div className='flex mb-4  w-full items-center'>
            <label htmlFor="title" className=''>Judul Test</label>
            <input type="text" className='ms-auto w-1/2' value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="description" className='me-40'>Deskripsi</label>
            <textarea type="text" className='w-1/2' value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="time-input">Durasi</label>
            <div className='flex gap-2'>
              <input onChange={(e) => setHours(e.target.value)} type="number" id="hour-input" name="hour-input" min="0" max="23" step="1" placeholder="JJ" required />
              <input onChange={(e) => setMinutes(e.target.value)} type="number" id="minute-input" name="minute-input" min="0" max="59" step="1" placeholder="MM" required />
              <input onChange={(e) => setSeconds(e.target.value)} type="number" id="seconds-input" name="seconds-input" min="0" max="59" step="1" placeholder="DD" required />
            </div>
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="waktu">Waktu mulai</label>
            <input onChange={(e) => setAvailableFrom(e.target.value)} type="datetime-local" className='w-1/2' min={new Date().toISOString().slice(0, 16)} required />
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="waktu">Waktu selesai</label>
            <input onChange={(e) => setAvailableTo(e.target.value)} type="datetime-local" className='w-1/2' min={new Date().toISOString().slice(0, 16)} required />
          </div>
          <div className='flex justify-end mt-40'>
            <Link to='/dashboard/test'>
              <button className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
            </Link>
            <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
          </div>
        </form>
      </div>
    </div>

  )
}
