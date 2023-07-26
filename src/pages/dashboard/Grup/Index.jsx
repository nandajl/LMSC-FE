import React, { useEffect, useState } from 'react'
import { AiOutlinePlusSquare, AiOutlineEdit, AiOutlineDelete, AiOutlineLoading } from 'react-icons/ai'
import { BiFileFind } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useUsers } from "../../../store";
import axios from 'axios';
import { REACT_APP_DEV_MODE } from "../../../utils/url";
import Alert from "../../../components/Alert";
import Card from "../../../components/Card";
import { FcCheckmark } from 'react-icons/fc';

export default function GrupAdmin() {
  const getUser = useUsers((state) => state.getUser)

  const [user, setUser] = useState("");
  const [course, setCourse] = useState("");
  const [courseMhs, setCourseMhs] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("");

  const handleEnrollCourse = async () => {
    try {
      setIsLoading(true);
      const data = {
        user_id : user.id,
        code : courseCode
      }
      console.log(data);
      const response = await axios.post(`${REACT_APP_DEV_MODE}/enrollment`, data);
      if (response) {
        console.log(response);
        setIsLoading(false);
        setIsDone(true);
      }
      window.location.reload(true);

    } catch (error) {
      if (error.response.status === 404) {
        setIsLoading(false)
        setError(true);
        setMessage(error.response.data.message);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
  }

  async function handleGetUser(){
    const response = await getUser()
    setUser(response);
  }

  useEffect(() => {
    handleGetUser();
  }, [])
  
  useEffect(() => {
    if (user) {
      handleGetCourse();
      handleGetEnrollCourse();
      console.log(courseMhs);
    }
  }, [user])

  const handleGetEnrollCourse = async () => {
    try {
      const data = {
        user_id : user.id
      }
      const response = await axios.post(`${REACT_APP_DEV_MODE}/enrollment/user`, data);
      console.log(response);
      setCourseMhs(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetCourse = async () => {
    try {
      const response = await axios.post(`${REACT_APP_DEV_MODE}/course/user`, {
        user_id: user.id
      })
      console.log(response);
      setCourse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function handleDelete(id){
    try {
      alert('Yakin ingin menghapus?')
      const response = await axios.delete(`http://localhost:8000/api/v1/course/${id}`)
      getListGrup('http://localhost:8000/api/v1/grup')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Mata Kuliah</p>
        {
          user.role === 'Mahasiswa' ? (
            <></>
          ) : (
            <Link to='/dashboard/matkul/create'>
              <AiOutlinePlusSquare className='text-5xl'/> 
            </Link>
          )
        }
      </div>
      <hr className='my-3'/>
      {
        user.role !== "Mahasiswa" ? (
          <></>
        ) : (
          <>
            <div className='flex items-center gap-5'>
              <label htmlFor="grup_code" className='w-1/4'>Input Kode Mata Kuliah </label>
              <input value={courseCode} onChange={(e) => setCourseCode(e.target.value)} type="text" placeholder='Grup Code' className='w-2/4 px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
              <button onClick={handleEnrollCourse} className='bg-secondary hover:bg-opacity-50 font-medium text-white px-4 py-2 rounded-lg'>Submit</button>
              {
                isLoading ? <AiOutlineLoading className='text-3xl animate-spin' /> :
                isDone ? <FcCheckmark className='text-3xl' /> :
                <></>
              }
            </div>
            {
              error ? (
                <div className='text-white bg-error px-3 py-1 rounded-full font-medium float-right mt-5'>
                  {message}
                  <button onClick={e => setError(false)} className='px-1 ms-2'>&#x2715;</button>
                </div>
              ) : <></>
            }
          </>
        )
      }
      <div className='flex gap-5 flex-wrap mt-5'>
        {
          user.role === "Mahasiswa" ? (
            courseMhs.length > 0 ? (
              courseMhs.map((course) => (
                <Link to={'/dashboard/matkul/detail/' + course.Course.id} key={course.Course.id}>
                  <Card key={course.Course.id} courseMhs={course.Course} /> 
                </Link>
            ))) : (
              <p>Belum ada Course</p>
            )
          ) : (
            course.length > 0 ? (
              course.map((course) => (
                <Link to={'/dashboard/matkul/detail/' + course.id} key={course.id}>
                  <Card key={course.id} course={course} /> 
                </Link>
            ))) : (
              <p>Belum ada Course</p>
            )
          )
        }

      </div>
      {/* <table className="min-w-full divide-y divide-gray-200 mt-10 shadow-lg">
        <thead className="bg-gray-300">
          <tr>
            <th scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-black uppercase "
            >
              No
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Nama Mata Kuliah
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Kode
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Deskripsi
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {
            course.length > 0 ? (
              course.map((course, index) => (
                <tr className='bg-white' key={course.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {course.name}  
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {course.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {course.description}
                  </td>
                  <td className="flex gap-2 px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                    <button onClick={() => navigate('/dashboard/matkul/edit/' + course.id)} className='border border-secondary text-secondary p-2 '> <AiOutlineEdit className='text-2xl'/> </button>
                    <button onClick={() => handleDelete(course.id)} className='border border-error text-error p-2 '> <AiOutlineDelete className='text-2xl'/> </button>
                  </td>
                </tr>
              ))
            ):(
              <></>
            )
          }
        </tbody>
      </table> */}
    </div>
  )
}
