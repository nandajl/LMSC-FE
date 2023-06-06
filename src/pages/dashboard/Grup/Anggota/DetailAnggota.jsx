import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineDelete } from "react-icons/ai";
import { BiFileFind } from "react-icons/bi";

export const DetailAnggota = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userAnswer, setUserAnswer] = useState([]);
  const [userTest, setUserTest] = useState([]);
  const [name, setName] = useState("")

  const handleGetTestMember = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/user/answer/find`, {
        user_id: id
      });
      setUserAnswer(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetTest = (userAnswer) => {
    const result = userAnswer.reduce((acc, curr) => {
      const existing = acc.get(curr.test_id);
      if (existing) {
        existing.Test = { ...existing.Test, ...curr.Test };
      } else {
        acc.set(curr.test_id, curr);
      }
      return acc;
    }, new Map());
  
    const distinctValues = Array.from(result.values());

    return distinctValues;
  }


  useEffect(() => {
    handleGetTestMember();
  }, [])

  useEffect(() => {
    if (userAnswer !== null) {
      console.log(handleGetTest(userAnswer));
      setUserTest(handleGetTest(userAnswer));
    }
  }, [userAnswer])

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Detail ujian </p>
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
              Test
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {
            userTest.length > 0 ? (
              userTest.map((test, index) => (
                <tr className='bg-white' key={test.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {index + 1} 
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {test.Test.title}  
                  </td>
                  <td className="flex gap-2 px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                    <button onClick={() => navigate('/dashboard/grup/anggota/jawaban/' + test.Test.id)} className='bg-secondary text-white p-2 shadow-lg'> <BiFileFind className='text-2xl'/> </button>
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
