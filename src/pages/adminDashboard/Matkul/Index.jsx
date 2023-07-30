import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlusSquare } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

export const Matkul = () => {

  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const handleGelAllCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/course`);
      setCourses(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id){
    try {
      alert('Yakin ingin menghapus?')
      await axios.delete(`http://localhost:8000/api/v1/course/${id}`)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGelAllCourse();
  }, [])

  return (
    <>
      <div className='flex justify-between font-inter'>
        <p className='text-3xl font-bold'>Mata Kuliah</p>
        <Link to='/dashboard/matkul/create'>
          <AiOutlinePlusSquare className='text-5xl'/> 
        </Link>
      </div>
      <div className='overflow-x-auto shadow-lg mt-10'>
        <table className="min-w-full divide-y divide-gray-200 shadow-lg">
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
                Code
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Dosen Pengampu
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="w-full divide-y divide-gray-200 ">
            {
              courses.length > 0 ? (
                courses.map((course, index) => (
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
                      {course.User.username}  
                    </td>
                    <td className="flex px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                      <button onClick={() => navigate('/dashboard/matkul/edit/' + course.id)} className='border border-secondary shadow-lg text-secondary p-2 me-2'> <AiOutlineEdit className='text-2xl'/> </button>
                      <button onClick={() => handleDelete(course.id)} className='border border-error text-error p-2 me-2 shadow-lg'> <AiOutlineDelete className='text-2xl'/> </button>
                    </td>
                  </tr>
                ))
              ):(
                <div>Tidak ada course</div>
              )
            }
          </tbody>
        </table>

      </div>
    </>

  )
}
