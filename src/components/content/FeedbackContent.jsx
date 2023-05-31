import React, { useEffect, useState } from 'react'
import { useUsers } from "../../store";
import axios from 'axios';
import { FaRegSmileWink, FaRegSmile } from "react-icons/fa";
import ModalFeedback from '../ModalFeedback';
import { AiOutlineDelete } from "react-icons/ai";

export default function FeedbackContent() {
  const getUser = useUsers((state) => state.getUser);

  const [user, setUser] = useState("")
  const [feedback, setFeedback] = useState([])

  const handleGetUser = async () => {
    const response = await getUser();
    setUser(response);
  }

  const handleGetFeedback = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/feedback/find`, {
        user_id: user.id
      });
      console.log(response.data.data);
      setFeedback(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/feedback/${id}`);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetUser();
  }, [])

  useEffect(() => {
    if (user !== "") {
      handleGetFeedback();
    }
  }, [user])

  return (
    <div className='h-full'>
      {
        feedback && feedback.length > 0 ? (
          <div>
            <div className='flex justify-between items-center'>
              <p className='font-bold text-3xl mb-6'>Feedback anda</p>
              <ModalFeedback />
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
                    Subjek
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                    Nilai
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
                  feedback.map((feedback, index) => (
                    <tr className='bg-white' key={feedback.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {feedback.FeedbackCat.name}  
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {
                          feedback.nilai === 1 ? '😔' : feedback.nilai === 2 ? '☹' : feedback.nilai === 3 ? '😐' : feedback.nilai === 4 ? '😄' : '😍' 
                        }  
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {feedback.message}
                      </td>
                      <td className="flex px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                        <button onClick={() => handleDelete(feedback.id)} className='border border-error text-error p-2 '> <AiOutlineDelete className='text-2xl' /> </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ) : (
          <div className='flex h-full items-center justify-center flex-col gap-5'>
            <p className='text-center text-lg'>Kamu belum memberikan Feedback, ayo beri feedback agar kamu bisa membantu kami berkembang  </p>
            <span className='text-4xl'>😉</span>
            <ModalFeedback />
          </div>
        )
      }
    </div>
  )
}
