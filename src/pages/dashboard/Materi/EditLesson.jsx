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

export default function EditLesson() {
  const getUser = useUsers((state) => state.getUser)
  const [body, setBody] = useState("")
  const [title, setTitle] = useState("")
  const [courseId, setCourseId] = useState("")
  const [companyCode, setCompanyCode] = useState("")
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUser();
  }, [companyCode])

  async function handleGetLesson(){
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/lessons/${id}`);
        console.log("response", response);
        setTitle(response.data.data.title);
        setBody(response.data.data.body);
        setCourseId(response.data.data.class_id)
    } catch (error) {
        console.log(error);
    }
  }

  async function handleGetUser(){
    const response = await getUser()
    console.log(response)
    setCompanyCode(response.company_code)
  }


  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append("title", title);
      data.append("body", body);
      data.append("content", content);

      const response = await axios.put(`http://localhost:8000/api/v1/lessons/${id}`, data)
      if (response) {
        navigate('/dashboard/matkul/detail/'+courseId)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetLesson();
    handleGetUser();
  }, []);

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Materi</p>
      </div>
      <div className='bg-white w-full mt-10 px-11 py-8'>
        <form onSubmit={handleSubmit}>
          <div className='flex mb-4 w-1/2 justify-between items-center'>
            <label htmlFor="name" className=''>Judul</label>
            <input onChange={e => setTitle(e.target.value)} type="text" className='ms-10 w-3/4' value={title}/>
          </div>
          <div className='flex mb-4 w-1/2 items-center justify-between'>
            <label htmlFor="waktu">File</label>
            <input onChange={(e) => setContent(e.target.files[0])} type="file" className='ms-10 w-3/4'/>
          </div>
          <div className='mb-4 w-full items-center mt-5'>
            <label htmlFor="Editor" className='me-40'>Isi</label>
            <div className='ms-auto mt-5'>
              <ReactQuill 
                theme='snow'
                value={body}
                onChange={setBody}
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
