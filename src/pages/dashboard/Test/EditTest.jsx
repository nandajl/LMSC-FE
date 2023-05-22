import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";

export default function EditTest() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [lessons, setLessons] = useState([]);
  const [lessonId, setLessonId] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  async function handleGetTest(){
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/test/${id}`);
      setTitle(response.data.data.title);
      setDescription(response.data.data.description);
      setLessonId(response.data.data.lessons_id);
    } catch (error) {
      console.log(error);
    }
  }

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
    handleGetTest();
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
          <div className='flex mb-4 w-2/3 justify-between items-center'>
            <label htmlFor="lesson" className=''>Materi</label>
            <select onChange={(e) => setLessonId(e.target.value)} name="lesson" id="lesson" className='ms-10 w-2/4'>
              <option value={lessonId} hidden>Pilih Materi</option>
              {
                lessons.map(lesson => <option value={lesson.id} key={lesson.id}>{lesson.title}</option> )
              }
            </select>
          </div>
          <div className='flex mb-4  w-2/3 items-center'>
            <label htmlFor="title" className=''>Judul Test</label>
            <input  type="text" className='ms-auto w-1/2' value={title} onChange={e => setTitle(e.target.value)}/>
          </div>
          <div className='flex mb-4 w-2/3 items-center justify-between'>
            <label htmlFor="description" className='me-40'>Deskripsi</label>
            <textarea type="text" className='w-1/2' value={description} onChange={e => setDescription(e.target.value)}/>
          </div>
          <div className='flex justify-end mt-40'>
            <Link to='/dashboard/test'>
              <button onClick={() => setIsAdding(false)} className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
            </Link>
            <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}
