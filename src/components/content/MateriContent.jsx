import React, { useEffect, useState } from 'react'
import Card from '../Card'
import axios from 'axios'
import { useUsers } from '../../store'
import { Link } from 'react-router-dom'

export default function MateriContent() {
  const getUser = useUsers((state) => state.getUser)

  const [lessons, setLessons] = useState([])
  const [user, setUser] = useState("");

  async function handleGetUser() {
    const response = await getUser()
    setUser(response);
  }


  async function handleGetLesson(){
    try {
      const response = await axios.post('http://localhost:8000/api/v1/lessons/find', {
        group_id: user.group_id
      })
      setLessons(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetUser();
  }, [])

  useEffect(() => {
    if (user && user.group_id) {
      handleGetLesson();
    }
  }, [user])

  return (
    <div>
      <p className='font-bold text-3xl mb-10'>Materi</p>
      <div className='flex gap-5 flex-wrap'>
        {
          lessons.length > 0 ? (
            lessons.map((lesson) => (
              <Link to={'/content/materi/detail/' + lesson.id} key={lesson.id}>
                <Card key={lesson.id} lesson={lesson} /> 
              </Link>
          ))) : (
            <p>Belum ada materi</p>
          )
        }
      </div>
    </div>
  )
}
