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
  const [companyCode, setCompanyCode] = useState(null);
  const [content, setContent] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 5120 * 5120;
    if (file && file.size > maxSize) {
      alert('Ukuran file tidak boleh lebih besar dari 25 MB');
      event.target.value = "";
    } else {
      setContent(file);
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append("title", title);
      data.append("body", body);
      data.append("course_id", id);
      data.append("content", content);
    
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
          <div className='flex mb-4 w-1/2 items-center justify-between'>
            <label htmlFor="waktu">File</label>
            <input onChange={handleFileChange} type="file" className='ms-10 w-3/4'/>
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
