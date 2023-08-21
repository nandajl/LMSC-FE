import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlusSquare } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { REACT_APP_DEV_MODE } from "../../../utils/url";

export const Dosen = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userMhs, setUserMhs] = useState([]);
  const [userDosen, setUserDosen] = useState([]);

  const handleGelAllUser = async () => {
    try {
      const response = await axios.get(`${REACT_APP_DEV_MODE}/users`);
      setUserMhs(response.data.data.filter((item) => item.role === 'Mahasiswa'));
      setUserDosen(response.data.data.filter((item) => item.role === 'Dosen'));
      setUsers(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    handleGelAllUser();
  }, [])

  return (
    <>
      <div className='flex justify-between font-inter'>
        <p className='text-3xl font-bold'>User</p>
        <Link to='/admin/user/create'>
          <AiOutlinePlusSquare className='text-5xl'/> 
        </Link>
      </div>
      <div className='overflow-x-auto mt-10'>
      <p className='text-2xl font-bold mb-5'>Dosen</p>
        <table className="min-w-full divide-y divide-gray-200 shadow-lg">
          <thead className="bg-gray-300">
            <tr>
              <th scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-black uppercase "
              >
                No
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Nama
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="w-full divide-y divide-gray-200 ">
            {
              userDosen.length > 0 ? (
                userDosen.map((user, index) => (
                  <tr className='bg-white' key={user.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {user.username}  
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {user.role}  
                    </td>
                    <td className="flex px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                      <button onClick={() => navigate('/admin/user/edit/' + user.id)} className='border border-secondary shadow-lg text-secondary p-2 me-2'> <AiOutlineEdit className='text-2xl'/> </button>
                      {/* <button onClick={() => handleDelete(user.id)} className='border border-error text-error p-2 me-2 shadow-lg'> <AiOutlineDelete className='text-2xl'/> </button> */}
                    </td>
                  </tr>
                ))
              ):(
                <tr>
                  <td>Tidak ada user</td>
                </tr>
              )
            }
          </tbody>
        </table>

      </div>
      
    </>

  )
}
