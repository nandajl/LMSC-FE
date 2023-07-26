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

export default function CreateLesson() {  
  const getUser = useUsers((state) => state.getUser)
  
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [body, setBody] = useState("")
  const [title, setTitle] = useState("")
  const [companyCode, setCompanyCode] = useState(null)
  const [grups, setGrups] = useState([]);
  const [grupId, setGrupId] = useState("")

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = {
        title: title,
        body: body,
        course_id: id
      };
      console.log(data);
      const response = await axios.post('http://localhost:8000/api/v1/lessons', data)
      if (response) {
        navigate('/dashboard/matkul/detail/' + id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    handleGetUser();
  }, [companyCode])
  
  async function handleGetUser(){
    const response = await getUser()
    console.log(response)
    setCompanyCode(response.company_code)
  }

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Materi</p>
      </div>
      <div className='bg-white w-full mt-10 px-11 py-8'>
        <form onSubmit={handleSubmit}>
          <div className='flex mb-4 w-1/2 justify-between items-center'>
            <label htmlFor="name" className=''>Judul</label>
            <input onChange={e => setTitle(e.target.value)} type="text" className='ms-10 w-3/4' />
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
            <Link to={'/dashboard/matkul/detail/'+id}>
              <button  className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
            </Link>
            <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
          </div>
        </form>
      </div>
    </div>
  )
}
