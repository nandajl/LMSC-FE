import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";

export default function EditTest() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("")
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const { id } = useParams();


  
  function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hour = String(dateObj.getHours()).padStart(2, "0");
    const minute = String(dateObj.getMinutes()).padStart(2, "0");
    const second = String(dateObj.getSeconds()).padStart(2, "0");
    const millisecond = String(dateObj.getMilliseconds()).padStart(3, "0");
  
    let formattedDate = `${year}-${month}-${day}T${hour}:${minute}`;
  
    if (second !== "00") {
      formattedDate += `:${second}`;
    }
  
    if (millisecond !== "000") {
      formattedDate += `.${millisecond}`;
    }
  
    return formattedDate;
  }

  function splitTime(time) {
    const [hour, minute, second] = time.split(":");
    return {
      hour: parseInt(hour),
      minute: parseInt(minute),
      second: parseInt(second),
    };
  }
  
  async function handleGetTest(){
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/test/${id}`);
      setTitle(response.data.data.title);
      setDescription(response.data.data.description);
      setCourseId(response.data.data.course_id);
      setAvailableFrom(formatDate(response.data.data.availableFrom));
      setAvailableTo(formatDate(response.data.data.availableTo));
      const { hour, minute, second } = splitTime(response.data.data.time);
      setHours(hour);
      setMinutes(minute);
      setSeconds(second);
    } catch (error) {
      console.log(error);
    }
  }
  

  function padZero(value) {
    // Menambahkan nol di depan nilai jika nilai kurang dari 10
    return value < 10 ? `0${value}` : value;
  }

  function convertTime(hours, minutes, seconds) {
    // Mengonversi input ke dalam format waktu yang sesuai
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  
    return formattedTime;
  }

  useEffect(() => {
    handleGetTest();
  }, [])

  async function handleSubmit(e){
    try {
      e.preventDefault();
      const time = convertTime(hours, minutes, seconds);
      const data = {
        title: title,
        description: description,
        time: time,
        availableFrom: availableFrom,
        availableTo: availableTo
      }
      console.log(data);
      const response = await axios.put('http://localhost:8000/api/v1/test/'+id, data);
      if (response) {
        navigate('/dashboard/matkul/detail/'+courseId)
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
            <input  type="text" className='ms-auto w-1/2' value={title} onChange={e => setTitle(e.target.value)}/>
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="description" className='me-40'>Deskripsi</label>
            <textarea type="text" className='w-1/2' value={description} onChange={e => setDescription(e.target.value)}/>
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="time-input">Durasi</label>
            <div className='flex gap-2'>
              <input value={hours} onChange={(e) => setHours(e.target.value)} type="number" id="hour-input" name="hour-input" min="0" max="23" step="1" placeholder="JJ" required />
              <input value={minutes} onChange={(e) => setMinutes(e.target.value)} type="number" id="minute-input" name="minute-input" min="0" max="59" step="1" placeholder="MM" required />
              <input value={seconds} onChange={(e) => setSeconds(e.target.value)} type="number" id="seconds-input" name="seconds-input" min="0" max="59" step="1" placeholder="DD" required />
            </div>
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="waktu">Waktu mulai</label>
            <input value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} type="datetime-local" className='w-1/2' required />
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="waktu">Waktu selesai</label>
            <input value={availableTo} onChange={(e) => setAvailableTo(e.target.value)} type="datetime-local" className='w-1/2' min={new Date().toISOString().slice(0, 16)} required />
          </div>
          <div className='flex justify-end mt-40'>
            <Link to={'/dashboard/matkul/detail/'+courseId}>
              <button onClick={() => setIsAdding(false)} className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
            </Link>
            <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}
