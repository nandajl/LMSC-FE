import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { REACT_APP_DEV_MODE } from "../../../../../utils/url";
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { useUsers } from "../../../../../store";
import { MdOutlineDateRange } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { TfiMarkerAlt } from 'react-icons/tfi';
import { cleanDateTime, getFormattedFileName } from '../../../../../utils/viewClean';

export const DetailAssignment = () => {
  const getUser = useUsers((state) => state.getUser)

  const [user, setUser] = useState("");
  const { id } = useParams();
  const [assignment, setAssignment] = useState([]);
  const [submission, setSubmission] = useState([]);
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false);
  const [filteredSubmission, setFilteredSubmission] = useState([])
  const [loadingSubmission, setLoadingSubmission] = useState(true);
  const [open, setOpen] = useState(false);
  const dateNow = new Date();


  async function handleGetUser() {
    const response = await getUser()
    setUser(response);
  }

  const handleGetAssignment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${REACT_APP_DEV_MODE}/assignment/${id}`);
      setAssignment(response.data);
      console.log(new Date(response.data.availableTo));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  const handleGetSubmission = async () => {
    try {
      const response = await axios.post(`${REACT_APP_DEV_MODE}/submission/assignment`, {
        assignment_id: id
      });
      if (response) {
        setSubmission(response.data);
        const userSubmission = response.data.filter(item => item.user_id === user.id);
        setFilteredSubmission(userSubmission);
        setLoadingSubmission(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmitSubmission = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();
      data.append("assignment_id", assignment.id);
      data.append("user_id", user.id);
      data.append("content", content);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axios.post(`${REACT_APP_DEV_MODE}/submission`, data, config);
      console.log(response);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteSubmission(event, id) {
    try {
      event.preventDefault();
      alert('Yakin ingin menghapus?');
      const response = await axios.delete(`${REACT_APP_DEV_MODE}/submission/${id}`)
      if (response.status === 201) {
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDownload = (event, url) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(`http://localhost:8000/file/${url}`);
  }

  useEffect(() => {
    handleGetUser();
    handleGetAssignment();
    handleGetSubmission();
  }, [loadingSubmission]);

  useEffect(() => {
    if (loadingSubmission === false) {
      handleGetSubmission();
      console.log("tes");
    }
  }, [loadingSubmission]);

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold capitalize'>{assignment.title}</p>
      </div>
      <hr className='my-3' />
      <div className=''>
        {
          loading ? (
            <p>Loading ...</p>
          ) : (
            <>
              <div className='bg-white p-10 rounded-3xl'>
                <div className='flex items-center gap-2 mb-5 font-semibold text-sm'>
                  <MdOutlineDateRange />{cleanDateTime(assignment.availableFrom)} - {cleanDateTime(assignment.availableTo)}
                </div>
                <p className='text-lg' dangerouslySetInnerHTML={{ __html: assignment.description }}/>
                {
                  assignment.content ? (
                    <button onClick={(event) => handleDownload(event, assignment.content)}><p className='border-2 border-black p-1 mt-5 hover:text-gray-400 hover:border-gray-400'>{getFormattedFileName(assignment.content)}</p></button>
                  ) : (
                    <p className='mt-5'>Tidak ada File</p>
                  )
                }
              </div>
              {
                user.role === "Mahasiswa" ? (
                  <>
                  <div className='bg-white p-10 rounded-3xl mt-5'>
                    <p className='text-lg font-bold mb-5'>Submission</p>
                    {
                      loadingSubmission ? (
                        <p>Loading ...</p>
                      ) : (
                        filteredSubmission ? (
                          filteredSubmission.map(item => (
                            <div className='flex items-center justify-between mb-5' key={item.id}>
                              <div className='flex items-center gap-2 w-1/2' >
                                <button onClick={(event) => handleDownload(event, item.content)} className='border-2 border-black p-1  hover:text-gray-400 hover:border-gray-400'>{getFormattedFileName(item.content)}</button>
                                <button onClick={(event) => handleDeleteSubmission(event, item.id)}><AiOutlineDelete className='text-2xl text-red-600 border-2 border-error' /></button>
                              </div>
                              <p>{cleanDateTime(item.updatedAt)}</p>
                            </div>
                          ))
                        ) : (
                          <p className='my-5'>Tidak ada submission</p>
                        )
                      )
                    }
                    {
                      new Date(assignment.availableTo) < dateNow ? (
                        <p className='my-5'>Submission telah habis</p>
                      ) : (
                        <form className='flex items-center justify-around' onSubmit={handleSubmitSubmission}>
                          <input type="file" onChange={(event) => setContent(event.target.files[0])} required />
                          <button type='submit' className='px-5 py-2 bg-slate-800 text-white hover:bg-slate-700'>Submit</button>
                        </form>
                      )
                    }
                  </div>
                  <div className='bg-white p-10 rounded-3xl mt-5'>
                    <p className='text-lg font-bold mb-5'>Nilai</p>
                    {
                      loadingSubmission ? (
                        <p>Loading ...</p>
                      ) : (
                        filteredSubmission ? (
                          filteredSubmission.map(item => (
                            <div className='flex items-center justify-between mb-5' key={item.id}>
                              <div className='flex items-center gap-2' >
                                <button onClick={(event) => handleDownload(event, item.content)} className='border-2 border-black p-1  hover:text-gray-400 hover:border-gray-400'>{getFormattedFileName(item.content)}</button>
                              </div>
                              {
                                item.score === null ? (
                                  <p className='my-5'>Belum ada Nilai</p>
                                ): (
                                  <p>Nilai : {item.score}</p>
                                )
                              }
                            </div>
                          ))
                        ) : (
                          <p className='my-5'>Tidak ada Nilai</p>
                        )
                      )
                    }
                  </div>
                  </>
                ) : (
                  <div className='bg-white p-10 rounded-3xl mt-5'>
                    <p className='text-lg font-bold mb-5'>Submission</p>
                    {
                      loadingSubmission ? (
                        <p>Loading ...</p>
                      ) : (
                        submission ? (
                          <div className='overflow-auto rounded-lg shadow'>
                            <table className='w-full'>
                              <thead className='bg-gray-100'>
                                <tr>
                                  <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-black uppercase "
                                  >
                                    No
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                                    Nama Mahasiswa
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                                    Submission
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                                    Nilai
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                                    Waktu submit
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-black uppercase ">
                                    Aksi
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 ">
                              {
                                submission.map((item, index) => (
                                  <tr className='bg-white' key={index}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {index + 1}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {item.User.username}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      <button onClick={(event) => handleDownload(event, item.content)} className='border-2 border-black p-1  hover:text-gray-400 hover:border-gray-400'>{getFormattedFileName(item.content)}</button>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {item.score}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {cleanDateTime(item.updatedAt)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      <button onClick={(event) => handleDeleteSubmission(event, item.id)}><AiOutlineDelete className='text-2xl text-red-600 border-2 border-error mr-2' /></button>
                                      <button onClick={() => setOpen(true)}><TfiMarkerAlt className='text-2xl text-secondary border-2 border-secondary' /></button>
                                      {
                                        open && (
                                          <ModalNilai open={open} setOpen={setOpen} id={item.id} />
                                        )
                                      }
                                      
                                    </td>
                                  </tr>
                                ))
                              }
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className='my-5'>Tidak ada submission</p>
                        )
                      )
                    }
                  </div>
                )
              }
            </>
          )
        }

      </div>
    </div>
  )

  
}

const ModalNilai = (props) => {
  const [nilai, setNilai] = useState(0);
  const setOpen = () => {
    props.setOpen(false)
  }
  const sendNilai = async () => {
   try {
    const response = await axios.put(`${REACT_APP_DEV_MODE}/submission/${props.id}`, {
      score: nilai
    })
    if (response.status === 201) {
      props.setOpen(false);
      window.location.reload(true);
    }
   } catch (error) {
    console.log(error);
   }
  }
  return(
    <Dialog.Root open={props.open}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black bg-opacity-40 fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-fadeIn fixed top-1/2 left-1/2 max-h-full w-2/4 max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
            <Dialog.Title className="text-xl font-medium pb-3 mb-6 border-b-2 border-slate-300">
              Beri Nilai
            </Dialog.Title>
            <div className=''>
              <label htmlFor="nilai" className="block mb-2 text-sm font-medium text-gray-900">Nilai</label>
              <input type="number" onChange={(event) => setNilai(event.target.value)} id="nilai" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={setOpen} className="text-secondary border border-secondary hover:border-blue-950 hover:text-blue-950 me-2 focus:shadow-green7 inline-flex h-9 items-center justify-center rounded-md px-4 font-medium leading-none focus:outline-none">
                Batal
              </button>
              <button onClick={sendNilai} className="text-gray-800 bg-primary hover:bg-green-200 hover:text-black focus:shadow-green7 inline-flex h-9 items-center justify-center rounded-md px-4 font-medium leading-none focus:outline-none">
                Simpan
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  )
}

