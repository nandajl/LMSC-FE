import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUsers } from "../../../store";

const modules = {
  toolbar: [
    [{header: [1,2,3,4,5,6,false]}],
    [{font:[]}],
    [{size:[]}],
    [{ 'align': [] }],
    ["bold","italic","underline","strike","blockquote"],
    [
      {list: "ordered"},
      {list: "bullet"},
      {indent: "+1"},
      {indent: "-1"},
    ],
    ["link","image","video"]

  ]
}

export default function CreateAssignment() {  
  const getUser = useUsers((state) => state.getUser)
  
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [courseId, setCourseId] = useState("")

  function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hour = String(dateObj.getHours()).padStart(2, "0");
    const minute = String(dateObj.getMinutes()).padStart(2, "0");
    const second = String(dateObj.getSeconds()).padStart(2, "0");
    const millisecond = String(dateObj.getMilliseconds()).padStart(3, "0");
  
    let formattedDate = `${year}-${month}-${day}T${hour}:${minute}`;
  
    if (second !== "00") {
      formattedDate += `:${second}`;
    }
  
    if (millisecond !== "000") {
      formattedDate += `.${millisecond}`;
    }
  
    return formattedDate;
  }

  function splitTime(time) {
    const [hour, minute, second] = time.split(":");
    return {
      hour: parseInt(hour),
      minute: parseInt(minute),
      second: parseInt(second),
    };
  }

  const handleGetAssignment = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/assignment/${id}`);
      console.log(response);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setContent(response.data.content);
      setAvailableFrom(formatDate(response.data.availableFrom));
      setAvailableTo(formatDate(response.data.availableTo));
      setCourseId(response.data.course_id);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = {
        title: title,
        description: description,
        availableFrom: availableFrom,
        availableTo: availableTo,
        content: content
      };
      console.log(data);
      const response = await axios.put('http://localhost:8000/api/v1/assignment/'+id, data)
      if (response) {
        navigate('/dashboard/matkul/detail/' + courseId);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    handleGetUser();
    handleGetAssignment();
  }, [])
  
  async function handleGetUser(){
    const response = await getUser()
    console.log(response)
  }

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Tugas</p>
      </div>
      <div className='bg-white w-full mt-10 px-11 py-8'>
        <form onSubmit={handleSubmit}>
          <div className='flex mb-4 w-full justify-between items-center'>
            <label htmlFor="name" className=''>Judul</label>
            <input onChange={e => setTitle(e.target.value)} value={title} type="text" className='ms-10 w-1/2' />
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="waktu">Waktu mulai</label>
            <input onChange={(e) => setAvailableFrom(e.target.value)} value={availableFrom} type="datetime-local" className='w-1/2' min={new Date().toISOString().slice(0, 16)} required />
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="waktu">Waktu selesai</label>
            <input onChange={(e) => setAvailableTo(e.target.value)} value={availableTo} type="datetime-local" className='w-1/2' min={new Date().toISOString().slice(0, 16)} required />
          </div>
          <div className='flex mb-4 w-full items-center justify-between'>
            <label htmlFor="waktu">File</label>
            <input onChange={(e) => setContent(e.target.value)} type="file" className='w-1/2' min={new Date().toISOString().slice(0, 16)} />
          </div>
          <div className='mb-4 w-full items-center mt-5'>
            <label htmlFor="Editor" className='me-40'>Deskripsi</label>
            <div className='ms-auto mt-5'>
              <ReactQuill 
                theme='snow'
                value={description}
                onChange={setDescription}
                modules={modules}
                className='h-48'
              />
            </div>
          </div>
          <div className='flex justify-end mt-40'>
            <Link to={'/dashboard/matkul/detail/'+courseId}>
              <button  className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
            </Link>
            <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
          </div>
        </form>
      </div>
    </div>
  )
}
