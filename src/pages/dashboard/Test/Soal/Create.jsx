import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

export default function CreateQuestion() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("")

  async function handleGetListLesson(){
    try {
      const response = await axios.get('http://localhost:8000/api/v1/lessons');
      setLessons(response.data.data)
      console.log(lessons);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetListLesson();
  }, [])

  async function handleSubmit(e){
    try {
      e.preventDefault();
      const data = {
        title: title,
        description: description,
        lessons_id: lessonId
      }
      console.log(data);
      const response = await axios.post('http://localhost:8000/api/v1/test', data);
      if (response) {
        navigate('/dashboard/test')
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
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="question" className='me-40'>Soal</label>
            <textarea type="text" className='w-full' value={question} onChange={e => setQuestion(e.target.value)}/>
          </div>
          <div className='flex justify-end mt-40'>
            <button onClick={() => navigate(-1)} className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
            <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
          </div>
        </form>
      </div>
    </div>
  )
}
