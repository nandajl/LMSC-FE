import React, { useEffect } from 'react'
import { AiOutlinePlusSquare, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useGrups } from "../../../store";
import axios from 'axios';

export default function GrupAdmin() {
  const getListGrup = useGrups((state) => state.getListGrup);
  const grups = useGrups((state) => state.grups);

  const navigate = useNavigate();

  useEffect(() => {
    getListGrup('http://localhost:8000/api/v1/grup')
  }, [])
  
  async function handleDelete(id){
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/grup/${id}`)
      console.log(response);
      
      getListGrup('http://localhost:8000/api/v1/grup')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Grup</p>
        <Link to='/dashboard/grup/create'>
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
              Nama Grup
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Kode
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {
            grups.length > 0 ? (
              grups.map((grup, index) => (
                <tr className='bg-white' key={grup.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {grup.name}  
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {grup.code}
                  </td>
                  <td className="flex px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                    <button onClick={() => navigate('/dashboard/grup/edit/' + grup.id)} className='border border-secondary text-secondary p-2 me-2'> <AiOutlineEdit className='text-2xl'/> </button>
                    <button onClick={() => handleDelete(grup.id)} className='border border-error text-error p-2 '> <AiOutlineDelete className='text-2xl'/> </button>
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
