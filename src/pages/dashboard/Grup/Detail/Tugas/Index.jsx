import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { REACT_APP_DEV_MODE } from "../../../../../utils/url";
import axios from 'axios';
import { useUsers } from "../../../../../store";
import ReactHtmlParser from 'react-html-parser';
import { MdOutlineDateRange } from 'react-icons/md';
import { cleanDateTime, getFormattedFileName } from '../../../../../utils/viewClean';

export const DetailAssignment = () => {
  const getUser = useUsers((state) => state.getUser)

  const [user, setUser] = useState("");
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [loading, setLoading] = useState(false);


  async function handleGetUser(){
    const response = await getUser()
    setUser(response);
  }

  const handleGetAssignment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${REACT_APP_DEV_MODE}/assignment/${id}`);
      setAssignment(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  const handleGetSubmission = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${REACT_APP_DEV_MODE}/submission/${user.id}`);
      setAssignment(response.data);
      setLoading(false);
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
  }, []);

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold capitalize'>{assignment.title}</p>
      </div>
      <hr className='my-3' />
      <div className=''>
        {
          loading ? (
            <></>
          ):(
            <>
              <div className='bg-white p-10 rounded-3xl'>
                <div className='flex items-center gap-2 mb-5 font-semibold text-sm'>
                  <MdOutlineDateRange/>{cleanDateTime(assignment.availableFrom)} - {cleanDateTime(assignment.availableTo)}
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
                user.role === "Mahasiswa" && 
                <div className='bg-white p-10 rounded-3xl mt-5'>
                  <p className='text-lg font-bold mb-5'>Submission</p>
                  {

                  }
                  <input type="file" />
                </div>
              }
            </>
          )
        }

      </div>
    </div>
  )
}
