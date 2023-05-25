import React, { useEffect, useState } from 'react'
import { useUsers } from "../../store";
import axios from 'axios';
import { FaRegSmileWink } from "react-icons/fa";
import ModalFeedback from '../ModalFeedback';

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
        user_id : user.id
      });
      console.log(response);
      setFeedback(response.data.data);
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
            <p className='font-bold text-3xl mb-6'>Feedback</p>
            {
            feedback.map((feedback) => (
              <div key={feedback.id}></div>
            ))
            }
          </div>
          ) : (
          <div className='flex h-full items-center justify-center flex-col gap-5'>
            <p className='text-center'>Kamu belum memberikan Feedback, ayo beri feedback agar kamu bisa membantu kami berkembang <FaRegSmileWink className='text-center mx-auto text-3xl' /> </p>
            <ModalFeedback />
          </div>
        )
      }
    </div>
  )
}
