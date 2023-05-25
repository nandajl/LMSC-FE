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
  const [grups, setGrups] = useState("")
  const [grupId, setGrupId] = useState("")
  const [companyCode, setCompanyCode] = useState("")
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUser();
    handleGetListGrup();
  }, [companyCode])

  async function handleGetLesson(){
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/lessons/${id}`);
        console.log("response", response);
        setTitle(response.data.data.title);
        setBody(response.data.data.body);
        setGrupId(response.data.data.goup_id)
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
      const data = {
        title: title,
        body: body
      };
      const response = await axios.put(`http://localhost:8000/api/v1/lessons/${id}`, data)
      if (response) {
        navigate('/dashboard/materi')
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetListGrup(){
    try {
      const response = await axios.post('http://localhost:8000/api/v1/grup/find', {
        companyCode : companyCode
      })
      setGrups(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetLesson();
    handleGetUser();
    handleGetListGrup();
  }, []);

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Materi</p>
      </div>
      <div className='bg-white w-full mt-10 px-11 py-8'>
        <form onSubmit={handleSubmit}>
          <div className='flex mb-4 w-1/2 justify-between items-center'>
            <label htmlFor="grup" className=''>Grup</label>
            <select name="grup" id="grup" onChange={(e) => setGrupId(e.target.value)} className='ms-10 w-3/4'>
            <option value={grupId} hidden>Pilih Grup</option>
              {
                grups.map(grup => <option value={grup.id} key={grup.id}>{grup.name}</option> )
              }
            </select>
          </div>
          <div className='flex mb-4 w-1/2 justify-between items-center'>
            <label htmlFor="name" className=''>Judul</label>
            <input onChange={e => setTitle(e.target.value)} type="text" className='ms-10 w-3/4' value={title}/>
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
            <Link to='/dashboard/materi'>
              <button  className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
            </Link>
            <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
          </div>
        </form>
      </div>
    </div>
  )
}
