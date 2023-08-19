import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { cleanDateTime } from '../../../../../utils/viewClean';
import { useUsers } from '../../../../../store';
import { Tabs } from "flowbite-react";
import { ModalSoal } from '../../../../../components/ModalSoal';
import { AiOutlineClose, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiFileFind } from 'react-icons/bi';

export default function DetailTest() {

  const getUser = useUsers((state) => state.getUser);

  const { id } = useParams();
  const [test, setTest] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [user, setUser] = useState("");
  const [question, setQuestion] = useState([]);
  const [userInTest, setUserInTest] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [testAnswer, setTestAnswer] = useState([]);
  const [showTest, setShowTest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nilai, setNilai] = useState("");
  const [nilaiMhs, setNilaiMhs] = useState("");
  const [mhsAnswer, setMhsAnswer] = useState([]);

  const navigate = useNavigate();

  async function handleGetUser() {
    const response = await getUser()
    setUser(response);
  }

  const handleGetUserAnswer = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:8000/api/v1/user/answer/find`, {
        test_id: id
      });
      setTestAnswer(response.data);
      const uniqueData = response.data.reduce((acc, curr) => {
        if (!acc.find(item => item.user_id === curr.user_id)) {
          acc.push(curr);
        }
        return acc;
      }, []);
      setUserInTest(uniqueData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetMahasiswaAnswer = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:8000/api/v1/user/answer/find`, {
        test_id: id,
        user_id: user.id
      });
      setMhsAnswer(response.data);
      const nilaiUser = response.data.filter(item => item.Answer.is_correct === true);
      setNilaiMhs(nilaiUser.length);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  

  async function handleGetTest() {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/v1/test/${id}`);
      setTest(response.data.data);
      setQuestion(response.data.data.Questions);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(idSoal) {
    try {
      alert("Apakah anda yakin ingin menghapus data ini?")
      const response = await axios.delete(`http://localhost:8000/api/v1/question/${idSoal}`)
      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowTest = (userId) => {
    const filteredAnswer = testAnswer.filter(item => item.user_id === userId);
    const nilaiUser = filteredAnswer.filter(item => item.Answer.is_correct === true);
    setNilai(nilaiUser.length);
    setUserAnswer(filteredAnswer)
    setShowTest(true);
  }

  useEffect(() => {
    handleGetTest();
    handleGetUser();
    handleGetUserAnswer();
    handleGetMahasiswaAnswer();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAssinment = () => {
    navigate('/test/assignment/' + id, { state: test.time });
  }

  if (user.role === 'Mahasiswa') {
    return (
      <div className='flex flex-col justify-center h-full text-center'>
        <div className='w-2/4 mx-auto rounded-3xl bg-blue-200 p-10 shadow-lg'>
          <p className=' font-bold text-2xl capitalize mb-2'>{test.title} </p>
          <p className=' font-meduim text-lg capitalize mb-5'>{test.description} </p>
          <div className='flex justify-between'>
            <p className='text-base capitalize'>Waktu mulai ujian </p>
            <p className='font-medium'>{cleanDateTime(test.availableFrom)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='text-base capitalize mb-5'>Waktu selesai ujian </p>
            <p className='font-medium'>{cleanDateTime(test.availableTo)}</p>
          </div>
          <p className='text-base capitalize mb-5'>Durasi : <span className='font-medium'>{test.time}</span></p>
          {
            dateTime < new Date(test.availableFrom) ? (
              <p className='text-red-500'>Ujian belum tersedia</p>
            ) : dateTime > new Date(test.availableTo) ? (
              <p className='text-red-500'>Ujian telah berakhir</p>
            ) : 
            userInTest.find(item => item.user_id === user.id) ? (
              <p className='text-red-500'>Ujian telah dikerjakan</p>
            ) :
              (
                <button onClick={handleAssinment} className='bg-info text-white font-bold py-2 px-4 rounded shadow-sm hover:bg-blue-500'>Mulai</button>
              )
          }
        </div>
        {
          mhsAnswer.length > 0 ? (
            <div className='w-2/4 mx-auto mt-5 rounded-3xl bg-blue-200 p-10 shadow-lg'>
              <p className=' font-bold text-2xl capitalize mb-2'>Hasil</p>
              <p>Nilai : {nilaiMhs}/{mhsAnswer.length}</p>
              {
                mhsAnswer.map((item, index) => (
                  <div key={index} className='flex flex-col gap-3 mt-5'>
                    <div className='mb-3'>
                      <p className='capitalize'>{index + 1}. {item.Question.question_text}</p>
                      <p className='ms-5'>Jawaban Mahasiswa : {item.Answer.answer_text}</p>
                      <p className='ms-5'>Jawaban Benar : {item.Question.Answers.find(answer => answer.is_correct === true).answer_text}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <></>
          )
        }
      </div>
    )
  }
  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold capitalize'>{test.title}</p>
      </div>
      <hr className='my-3' />
      <div className=''>
        {
          loading ? (
            <></>
          ) : (
            <Tabs.Group
              aria-label="Default tabs"
              style="default"
            >
              <Tabs.Item
                active
                title="Tentang"
              >
                <div className='bg-white p-10 rounded-3xl'>
                  <div className='flex items-center mb-3'>
                    <p className='w-1/3'>Deskripsi</p>
                    <p className=''>{test.description}</p>
                  </div>
                  <div className='flex items-center mb-3'>
                    <p className='w-1/3'>Waktu</p>
                    <p className=''>{test.time}</p>
                  </div>
                  <div className='flex items-center mb-3'>
                    <p className='w-1/3'>Waktu mulai ujian</p>
                    <p className=''>{cleanDateTime(test.availableFrom)}</p>
                  </div>
                  <div className='flex items-center mb-3'>
                    <p className='w-1/3'>Waktu selesai ujian</p>
                    <p className=''>{cleanDateTime(test.availableTo)}</p>
                  </div>
                  <Link to={'/dashboard/test/edit/' + test.id}>
                    <AiOutlineEdit className='text-2xl border-2 border-black float-right hover:text-white hover:border-white' />
                  </Link>
                </div>
              </Tabs.Item>
              <Tabs.Item
                title="Pertanyaan"
              >
                <div className='bg-white p-10 rounded-3xl'>
                  <div className='overflow-auto rounded-lg shadow'>
                    <table className='w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-300'>
                        <tr>
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>No</th>
                          <th className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>Soal</th>
                          <th className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>Aksi</th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {
                          question.map((item, index) => (
                            <tr key={index}>
                              <td className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>{index + 1}</td>
                              <td className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>
                                <a href="#" className='hover:underline'>
                                  {item.question_text}
                                </a>
                              </td>
                              <td className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>
                                <button onClick={(e) => handleDelete(item.id)} className='text-error text-2xl'><AiOutlineDelete /></button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className='w-10 ms-auto mt-5'>
                    <ModalSoal className='w-5' testId={id} />
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item
                title="Hasil"
              >
                <div className='bg-white p-10 rounded-3xl'>
                  <div className='overflow-auto rounded-lg shadow'>
                    <table className='w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-300'>
                        <tr>
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>No</th>
                          <th className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>Nama Mahasiswa</th>
                          <th className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>Hasil Ujian</th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {
                          userInTest.map((item, index) => (
                            <tr key={index}>
                              <td className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>{index + 1}</td>
                              <td className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>
                                {item.User.username}
                              </td>
                              <td className='px-6 py-3 text-xs font-bold text-left text-black uppercase'>
                                <button onClick={(e) => handleShowTest(item.user_id)} className='hover:underline'>
                                  <BiFileFind className='text-secondary text-2xl' />
                                </button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                {
                  showTest && (
                    <div className='bg-white p-10 rounded-3xl mt-10'>
                      <button className='float-right' onClick={() => setShowTest(false)}><AiOutlineClose/></button>
                      <h1 className='text-2xl font-semibold mb-5'>Hasil Ujian </h1>
                      <p>{userAnswer[0].User.username}</p>
                      <p>{userAnswer[0].User.nim}</p>
                      <p>Nilai Kuis : {nilai}/{userAnswer.length}</p>
                      {
                        userAnswer.map((item, index) => (
                          <div key={index} className='flex flex-col gap-3 mt-5'>
                            <div className='mb-3'>
                              <p className='capitalize'>{index + 1}. {item.Question.question_text}</p>
                              <p className='ms-5'>Jawaban Mahasiswa : {item.Answer.answer_text}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </Tabs.Item>
            </Tabs.Group>
          )
        }

      </div>
    </div>
  )
}
