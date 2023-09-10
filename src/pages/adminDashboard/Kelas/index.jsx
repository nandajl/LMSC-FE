import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlusSquare } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

export const Kelas = () => {

  const navigate = useNavigate();
  const [kelas, setKelas] = useState([]);

  const handleGelAllKelas = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/class`);
      setKelas(response.data.data);
      console.log(response.data.data);  
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id){
    try {
      alert('Yakin ingin menghapus?')
      await axios.delete(`http://localhost:8000/api/v1/class/${id}`)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGelAllKelas();
  }, [])

  return (
    <>
      <div className='flex justify-between font-inter'>
        <p className='text-3xl font-bold'>Kelas</p>
        <Link to='/dashboard/matkul/create'>
          <AiOutlinePlusSquare className='text-5xl'/> 
        </Link>
      </div>
      <div className='overflow-x-auto mt-10 pb-10'>
        <table className="min-w-full divide-y divide-gray-200 shadow-lg">
          <thead className="bg-gray-300">
            <tr>
              <th scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-black uppercase "
              >
                No
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Nama Kelas
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Nama Mata Kuliah
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Code
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Dosen Pengampu 1
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Dosen Pengampu 2
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="w-full divide-y divide-gray-200 ">
            {
              kelas.sort((a, b) => b.id - a.id).length > 0 ? (
                kelas.map((kelas, index) => (
                  <tr className='bg-white' key={kelas.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {kelas.name}  
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {kelas.Course.name}  
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {kelas.code}  
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {
                        kelas.dosen_1 === null ? "Tidak ada" : kelas.dosen_1.username } 
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {
                        kelas.dosen_2 === null ? "Tidak ada" : kelas.dosen_2.username }  
                    </td>
                    <td className="flex px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                      <button onClick={() => navigate('/dashboard/matkul/edit/' + kelas.id)} className='border border-secondary shadow-lg text-secondary p-2 me-2'> <AiOutlineEdit className='text-2xl'/> </button>
                      <button onClick={() => handleDelete(kelas.id)} className='border border-error text-error p-2 me-2 shadow-lg'> <AiOutlineDelete className='text-2xl'/> </button>
                    </td>
                  </tr>
                ))
                
              ):(
                <div>Tidak ada kelas</div>
              )
            }
          </tbody>
        </table>

      </div>
    </>

  )
}
