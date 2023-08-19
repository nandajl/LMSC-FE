import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDateRange } from 'react-icons/md'
import { BsCardChecklist } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { REACT_APP_DEV_MODE } from "../utils/url";
import { useUsers } from "../store";
import { cleanDateTime, makeExcerpt, getFormattedFileName } from "../utils/viewClean";

export default function Card(props) {
  const getUser = useUsers((state) => state.getUser)
  
  const [user, setUser] = useState("");

  async function handleGetUser(){
    const response = await getUser()
    setUser(response);
  }

  useEffect(() => {
    handleGetUser();
  }, [])

  async function handleDeleteLesson(event, id){
    try {
      event.preventDefault();
      event.stopPropagation();
      alert('Yakin ingin menghapus?');
      const response = await axios.delete(`${REACT_APP_DEV_MODE}/lessons/${id}`)
      console.log(response);
      if (response.status === 201) {
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error); 
    }
  }

  const handleDownload = (event, url) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(`http://localhost:8000/file/${url}`);
  }

  async function handleDeleteAssignment(event, id){
    try {
      console.log("id", id);
      event.preventDefault();
      event.stopPropagation();
      alert('Yakin ingin menghapus?');
      const response = await axios.delete(`${REACT_APP_DEV_MODE}/assignment/${id}`)
      if (response.status === 201) {
        window.location.reload(true);
      }
      window.location.reload(true);
    } catch (error) {
      console.log(error); 
    }
  }
  async function handleDeleteTest(event, id){
    try {
      event.preventDefault();
      event.stopPropagation();
      alert('Yakin ingin menghapus?');
      const response = await axios.delete(`${REACT_APP_DEV_MODE}/test/${id}`)
      if (response.status === 201) {
        window.location.reload(true);
      }
      window.location.reload(true);
    } catch (error) {
      console.log(error); 
    }
  }
  
  if (props.course) {
    return(
      <div className='w-48 h-48 rounded-lg shadow-lg p-4 bg-blue-200 hover:-translate-y-4 hover:duration-200 '>
        <h1 className='font-bold text-xl capitalize mb-3'>{props.course.Course.name}</h1>
        <p>{props.course.description}</p>
      </div>
    )
  }
  if (props.courseMhs) {
    return(
      <div className='w-48 h-48 rounded-lg shadow-lg p-4 bg-blue-200 hover:-translate-y-4 hover:duration-200 '>
        <h1 className='font-bold text-xl capitalize mb-3'>{props.courseMhs.name}</h1>
        <p>{props.courseMhs.description}</p>
      </div>
    )
  }
  if (props.assignment) {
    return(
      <div className='flex flex-col justify-between w-full h-48 rounded-lg shadow-lg p-4 bg-blue-200 hover:-translate-y-4 hover:duration-200 '>
        <div>
          <h1 className='font-bold text-xl capitalize mb-3'>{props.assignment.title}</h1>
          {
            props.assignment.description ? (
              <>
                <div className='flex items-center gap-2'>
                  <BsCardChecklist/>{makeExcerpt(props.assignment.description, 100)}
                </div>
                <div className='flex items-center gap-2'>
                  <MdOutlineDateRange/>{cleanDateTime(props.assignment.availableFrom)} - {cleanDateTime(props.assignment.availableTo)}
                </div>
                {
                  props.assignment.content ? (
                    <button onClick={(event) => handleDownload(event, props.assignment.content)}><p className='border-2 border-black p-1 mt-5 hover:text-white hover:border-white'>{getFormattedFileName(props.assignment.content)}</p></button>
                    ) : (
                    <p className='mt-5'>Tidak ada File</p>
                  )
                }
              </>
              
            ) : (
              <p>{props.assignment.description}</p>
            )
          }
        </div>
        {
          user.role === "Mahasiswa" ? (
            <></>
          ) : (
            <div className='flex justify-end gap-1'>
              <Link to={'/dashboard/assignment/edit/'+ props.assignment.id}>
                <AiOutlineEdit className='text-2xl border-2 border-black float-right hover:text-white hover:border-white'/>
              </Link>
              <button onClick={(event) => handleDeleteAssignment(event, props.assignment.id)}><AiOutlineDelete className='text-2xl text-error border-2 border-error float-right hover:text-white hover:border-white'/></button>
            </div>
          )
        }
      </div>
    )
  }
  if (props.lesson) {
    return(
      <div className='flex flex-col justify-between w-48 h-48 rounded-lg shadow-lg p-4 bg-blue-200 hover:-translate-y-4 hover:duration-200 '>
        <div>
          <h1 className='font-bold text-xl capitalize mb-3'>{props.lesson.title}</h1>
          {makeExcerpt(props.lesson.body, 20)}
        </div>
        {
          user.role === "Mahasiswa" ? (
            <></>
          ) : (
            <div className='flex justify-end gap-1'>
              <Link to={'/dashboard/materi/edit/'+ props.lesson.id}>
                <AiOutlineEdit className='text-2xl border-2 border-black float-right hover:text-white hover:border-white'/>
              </Link>
              <button onClick={(event) => handleDeleteLesson(event, props.lesson.id)}><AiOutlineDelete className='text-2xl text-error border-2 border-error float-right hover:text-white hover:border-white'/></button>
            </div>
          )
        }
      </div>
    )
  }
  if (props.test) {
    return(
      <div className='flex flex-col justify-between w-48 h-48 rounded-lg shadow-lg p-4 bg-blue-200 hover:-translate-y-4 hover:duration-200 '>
        <div>
          <h1 className='font-bold text-xl capitalize mb-3'>{props.test.title}</h1>
          <p>{props.test.description}</p>
        </div>
        {
          user.role === "Mahasiswa" ? (
            <></>
          ) : (
            <div className='flex justify-end gap-1'>
              <Link to={'/dashboard/test/edit/'+ props.test.id}>
                <AiOutlineEdit className='text-2xl border-2 border-black float-right hover:text-white hover:border-white'/>
              </Link>
              <button onClick={(event) => handleDeleteTest(event, props.test.id)}><AiOutlineDelete className='text-2xl text-error border-2 border-error float-right hover:text-white hover:border-white'/></button>
            </div>
          )
        }
      </div>
    )
  }
  else(
    <>
    </>
  )
}
