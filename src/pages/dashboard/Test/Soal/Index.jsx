import React, { useEffect, useState } from 'react'
import { AiOutlinePlusSquare, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BiFileFind } from 'react-icons/bi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { ModalSoal } from '../../../../components/ModalSoal';

export default function Index() {

  const [questions, setQuestions] = useState([])
  const [title, setTitle] = useState("")
  
  const { id } = useParams();

  const navigate = useNavigate();
  
  async function handleDelete(idQ){
    try {
      alert("Apakah anda yakin ingin menghapus data ini?")
      const response = await axios.delete(`http://localhost:8000/api/v1/question/${idQ}`)
      console.log(response);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTest(){
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/test/${id}`);
        setTitle(response.data.data.title);
      } catch (error) {
        console.log(error);
      }
  }

  async function handleGetQuestions(){
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/question/test/${id}`);
      setQuestions(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    handleGetQuestions();
    getTest();
  }, [title])

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Soal {title}</p>
        
        <ModalSoal testId={id} />
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-10">
        <thead className="bg-gray-300">
          <tr>
            <th scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-black uppercase "
            >
              No
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Soal
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="w-full divide-y divide-gray-200 ">
          {
            questions.length > 0 ? (
              questions.map((question, index) => (
                <tr className='bg-white' key={question.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {question.question_text}  
                  </td>
                  <td className="flex px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                    <button onClick={() => handleDelete(question.id)} className='border border-error text-error p-2 me-2'> <AiOutlineDelete className='text-2xl'/> </button>
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
