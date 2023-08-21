import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from "react-router-dom";
import { REACT_APP_DEV_MODE } from "../../../../../utils/url";
import axios from 'axios';
import { useUsers } from "../../../../../store";
import { getFormattedFileName } from "../../../../../utils/viewClean";

export const DetailMateri = () => {
  const getUser = useUsers((state) => state.getUser)

  const [user, setUser] = useState("");
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);


  async function handleGetUser(){
    const response = await getUser()
    setUser(response);
  }

  const handleGetCourse = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${REACT_APP_DEV_MODE}/course/${id}`);
      console.log(response.data.data);
      setCourse(response.data.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetLesson = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${REACT_APP_DEV_MODE}/lessons/${id}`);
      setLessons(response.data.data);
      console.log(lessons.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDownload = (event, url) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(`http://localhost:8000/file/${url}`);
  }

  useEffect(() => {
    handleGetCourse();
    handleGetUser();
    handleGetLesson();
  }, []);

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold capitalize'>{lessons.title}</p>
      </div>
      <hr className='my-3' />
      <div className=''>
        {
          loading ? (
            <p>Loading ...</p>
          ):(
            <div className='bg-white p-10 rounded-3xl'>
              {
                lessons.content ? (
                  <button onClick={(event) => handleDownload(event, lessons.content)}><p className='border-2 border-black p-1 my-5 hover:text-gray-400 hover:border-gray-400'>{getFormattedFileName(lessons.content)}</p></button>
                ) : (
                  <p>Tidak Ada File</p>
                )
              }
              <p dangerouslySetInnerHTML={{ __html: lessons.body }}/>
            </div>
          )
        }

      </div>
    </div>
  )
}
