import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineDelete } from "react-icons/ai";
import { BiFileFind } from "react-icons/bi";

export const AnggotaGrup = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [grupMember, setGrupMember] = useState([]);

  const handleGetMemberGrup = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/users/find`, {
        group_id: id
      });
      setGrupMember(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/users/${id}`, {
        group_id : null
      });
      if (response) {
        window.location.reload(true);  
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetMemberGrup();
  }, [])

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Anggota Grup</p>
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
              Nama Anggota
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {
            grupMember.length > 0 ? (
              grupMember.map((member, index) => (
                <tr className='bg-white' key={member.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {member.firstName}  
                  </td>
                  <td className="flex gap-2 px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                    <button onClick={() => navigate('/dashboard/grup/anggota/detail/' + member.id)} className='bg-secondary text-white p-2 shadow-lg'> <BiFileFind className='text-2xl'/> </button>
                    <button onClick={() => handleDelete(member.id)} className='border border-error text-error p-2 '> <AiOutlineDelete className='text-2xl'/> </button>
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
