import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
export const DetailJawabanTest = () => {

  const { id } = useParams();

  const [userAnswer, setUserAnswer] = useState([]);
  const [userAnswerFilter, setUserAnswerFilter] = useState([]);
  const [userTest, setUserTest] = useState([]);

  const handleGetTestMember = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/user/answer/find`, {
        user_id: id
      });
      console.log(response.data);
      setUserAnswer(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleGetTestMember();
  }, [])

  const handleGetTest = (userAnswer, id) => {
    const filter = userAnswer.filter((test) => test.test_id == id);
    return filter;
  };
  
  useEffect(() => {
    if (userAnswer !== null) {
      const filteredData = handleGetTest(userAnswer, id);
      console.log(filteredData);
      setUserAnswerFilter(filteredData);
    }
  }, [userAnswer, id])

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Test </p>
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
              Question
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Answer
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {
            userAnswerFilter.length > 0 ? (
              userAnswerFilter.map((answer, index) => (
                <tr className='bg-white' key={answer.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {answer.Question.question_text}  
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {answer.user_answer}  
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
