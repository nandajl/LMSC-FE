import React, { useEffect } from 'react'
import { AiOutlinePlusSquare, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useLessons } from '../../../store'
import axios from 'axios';

export default function MateriAdmin() {
  
  const lessons = useLessons((state) => state.lessons);
  const getListLessons = useLessons((state) => state.getListLessons);

  const navigate = useNavigate();

  useEffect(() => {
    getListLessons('http://localhost:8000/api/v1/lessons')
  }, [])
  
  async function handleDelete(id){
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/lessons/${id}`)
      console.log(response);
      getListLessons('http://localhost:8000/api/v1/lessons')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Materi</p>
        <Link to='/dashboard/materi/create'>
          <AiOutlinePlusSquare className='text-5xl'/> 
        </Link>
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-10 shadow-lg">
        <thead className="bg-gray-300">
          <tr>
            <th scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-black uppercase "
            >
              No
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Judul
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Isi
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {
            lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <tr className='bg-white' key={lesson.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {lesson.title}  
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 " dangerouslySetInnerHTML={{__html: lesson.body}} />
                  <td className="flex px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                    <button onClick={() => navigate('/dashboard/materi/edit/' + lesson.id)} className='border border-secondary text-secondary p-2 me-2'> <AiOutlineEdit className='text-2xl'/> </button>
                    <button onClick={() => handleDelete(lesson.id)} className='border border-error text-error p-2 '> <AiOutlineDelete className='text-2xl'/> </button>
                  </td>
                </tr>
              ))
            ):(
              <></>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
