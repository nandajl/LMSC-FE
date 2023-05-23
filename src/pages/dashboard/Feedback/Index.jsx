import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import { useFeedback } from '../../../store'
import axios from 'axios';

export default function MateriAdmin() {
  
  const feedbacks = useFeedback((state) => state.feedbacks);
  const getListFeedback = useFeedback((state) => state.getListFeedback);

  const navigate = useNavigate();

  useEffect(() => {
    getListFeedback('http://localhost:8000/api/v1/feedback')
  }, [])
  
  async function handleDelete(id){
    try {
      alert("Apakah anda yakin ingin menghapus data ini?")
      const response = await axios.delete(`http://localhost:8000/api/v1/feedback/${id}`)
      console.log(response);
      getListFeedback('http://localhost:8000/api/v1/feedback')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Feedback</p>
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
              User
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Subjek
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Pesan
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="w-full divide-y divide-gray-200 ">
          {
            feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <tr className='bg-white' key={feedback.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {feedback.User.username}  
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {feedback.subject}  
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {feedback.message}  
                  </td>
                  <td className="flex px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                    <button onClick={() => handleDelete(feedback.id)} className='border border-error text-error p-2 '> <AiOutlineDelete className='text-2xl'/> </button>
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
