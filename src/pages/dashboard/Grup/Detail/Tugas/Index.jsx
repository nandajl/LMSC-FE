import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { REACT_APP_DEV_MODE } from "../../../../../utils/url";
import axios from 'axios';
import { useUsers } from "../../../../../store";
import ReactHtmlParser from 'react-html-parser';
import { MdOutlineDateRange } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
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
  }, []);

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
                <p className='text-lg'>{ReactHtmlParser(assignment.description)}</p>
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
                  <div className='bg-white p-10 rounded-3xl mt-5'>
                    <p className='text-lg font-bold mb-5'>Submission</p>
                    {
                      loadingSubmission ? (
                        <p>Loading ...</p>
                      ) : (
                        filteredSubmission ? (
                          filteredSubmission.map(item => (
                            <div className='flex items-center justify-between mb-5' key={item.id}>
                              <div className='flex items-center gap-2' >
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
                                      {cleanDateTime(item.updatedAt)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      <button onClick={(event) => handleDeleteSubmission(event, item.id)}><AiOutlineDelete className='text-2xl text-red-600 border-2 border-error' /></button>
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
