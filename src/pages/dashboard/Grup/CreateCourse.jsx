import React, { useEffect, useState } from 'react'
import { HiOutlineRefresh } from "react-icons/hi";
import { generate } from '@wcj/generate-password';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useUsers } from "../../../store";

export default function CreateCourse(setIsAdding) {
  const getUser = useUsers((state) => state.getUser)
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [companyCode, setCompanyCode] = useState("")
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("")

  async function handleSubmit(e){
    try {
      e.preventDefault();
      const data = {
        name: name,
        code: code,
        user_id: user.id,
        description: description
      }
      const response = await axios.post('http://localhost:8000/api/v1/course', data);
      if (response.status === 201) {
        navigate('/dashboard/matkul')
      }
    } catch (error) {
      console.log(error);
    }
  }
  
    async function handleGetUser(){
      const response = await getUser()
      setUser(response);
    }
    
    useEffect(() => {
      handleGetUser();
    }, [companyCode])


  function handleGenerateCode(e){
    e.preventDefault();
    const code = generate({ length: 6, special: false, lowerCase: false });
    setCode(code);
    console.log(code);
  }

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold'>Mata Kuliah</p>
      </div>
      <div className='bg-white w-full mt-10 px-11 py-8'>
        <form onSubmit={handleSubmit}>
          <div className='flex mb-4  w-full items-center'>
            <label htmlFor="name" className=''>Nama Mata Kuliah</label>
            <input  type="text" className='ms-auto w-1/2' value={name} onChange={e => setName(e.target.value)}/>
          </div>
          <div className='flex mb-4 w-full items-center'>
            <label htmlFor="name" className='me-40'>Code</label>
            <div className='ms-auto w-1/2'>
              <button onClick={handleGenerateCode} className='border border-black p-1 align-middle me-2'> <HiOutlineRefresh className='text-2xl '/> </button>
              <input type="text" value={code} onChange={e => setCode(e.target.value)} disabled/>
            </div>
          </div>
          <div className='flex mb-4 w-full justify-between'>
            <label htmlFor="description" className='me-40'>Deskripsi</label>
            <textarea type="text" className='w-1/2' value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className='flex justify-end mt-40'>
            <Link to='/dashboard/matkul'>
              <button onClick={() => setIsAdding(false)} className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
            </Link>
            <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}
