import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DetailMateriContent() {

  const [lesson, setLesson] = useState("")
  const { id } = useParams();

  const handleGetLesson = async() => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/lessons/${id}`);
      setLesson(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetLesson();
  }, [])

  return (
    <div>
      <p className='font-bold text-3xl mb-10'>{lesson.title}</p>
      <div className='text-justify' dangerouslySetInnerHTML={{__html: lesson.body}} />

    </div>
  )
}
