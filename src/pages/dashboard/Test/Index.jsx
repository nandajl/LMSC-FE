import React, { useEffect } from 'react'
import { AiOutlinePlusSquare, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useTests } from '../../../store'
import axios from 'axios';

export default function MateriAdmin() {
  
  const tests = useTests((state) => state.tests);
  const getListTest = useTests((state) => state.getListTest);

  const navigate = useNavigate();

  useEffect(() => {
    getListTest('http://localhost:8000/api/v1/test')
  }, [])
  
  async function handleDelete(id){
    try {
      alert("Apakah anda yakin ingin menghapus data ini?")
      const response = await axios.delete(`http://localhost:8000/api/v1/test/${id}`)
      console.log(response);
      getListTest('http://localhost:8000/api/v1/test')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Test</p>
        <Link to='/dashboard/test/create'>
          <AiOutlinePlusSquare className='text-5xl'/> 
        </Link>
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-10">
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
              Deskripsi
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="w-full divide-y divide-gray-200 ">
          {
            tests.length > 0 ? (
              tests.map((test, index) => (
                <tr className='bg-white' key={test.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {test.title}  
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {test.description}  
                  </td>
                  <td className="flex px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                    <button onClick={() => navigate('/dashboard/test/edit/' + test.id)} className='border border-secondary text-secondary p-2 me-2'> <AiOutlineEdit className='text-2xl'/> </button>
                    <button onClick={() => handleDelete(test.id)} className='bg-error text-white p-2 '> <AiOutlineDelete className='text-2xl'/> </button>
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
