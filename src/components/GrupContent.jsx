import React, { useEffect, useState } from 'react'
import { useUsers } from "../store";
import { AiOutlineLoading, AiOutlineCheck } from 'react-icons/ai'
import { FcCheckmark } from 'react-icons/fc'
import axios from 'axios';

export default function Content() {
  
  const getUser = useUsers((state) => state.getUser);

  const [user, setUser] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [grupCode, setGrupCode] = useState("");
  const [grupMember, setGrupMember] = useState([]);

  async function handleGetUser(){
    const response = await getUser();
    setUser(response)
  }

  async function handleRollGrup(e){
    try {
      e.preventDefault();
      setIsLoading(true);
      const data = {
        grupCode : grupCode
      }
      const response = await axios.post('http://localhost:8000/api/v1/grup/find', data);
      console.log(response.data.data[0].id);
      if (response) {
        setIsLoading(false);
        setIsDone(true);
        const responseUser = await axios.put(`http://localhost:8000/api/v1/users/${user.id}`, {
          group_id: response.data.data[0].id
        })
        console.log(responseUser);
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetMemberGrup(){
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/users/find`, {
        group_id: user.group_id
      });
      if (response) {
        setGrupMember(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    handleGetUser();
    handleGetMemberGrup();
  }, [user])

  return (
    <div className=''>
      <p className='font-bold text-3xl mb-6'>Grup Anda</p>
      {
        user.group_id === null ? (
          <div className='flex items-center gap-5'>
            <label htmlFor="grup_code" className='w-1/4'>Input Grup Code</label>
            <input value={grupCode} onChange={(e) => setGrupCode(e.target.value)} type="text" placeholder='Grup Code' className='w-2/4 px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
            <button onClick={handleRollGrup} className='bg-secondary hover:bg-opacity-50 font-medium text-white px-4 py-2 rounded-lg'>Submit</button>
            {
              isLoading ? <AiOutlineLoading className='text-3xl animate-spin' /> :
              isDone ? <FcCheckmark className='text-3xl' /> :
              <></>
            }
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  No
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                  Anggota
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {
                grupMember.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {item.firstName} {item.lastName}
                    </td>
                  </tr>
                  
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  )
}
