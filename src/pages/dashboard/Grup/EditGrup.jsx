import React, { useEffect, useState } from 'react'
import { HiOutlineRefresh } from "react-icons/hi";
import { generate } from '@wcj/generate-password';
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import { useGrups } from "../../../store";

export default function EditGrup() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false)
  const { id } = useParams();

  async function handleGetGrup(){
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/v1/grup/${id}`)
      console.log(response);
      setName(response.data.data.name);
      setCode(response.data.data.code);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    handleGetGrup();
  },[])

  async function handleSubmit(e){
    try {
      e.preventDefault();
      const data = {
        name: name,
        code: code
      }
      const response = await axios.put(`http://localhost:8000/api/v1/grup/${id}`, data);
      if (response) {
        navigate('/dashboard/grup');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleGenerateCode(e){
    e.preventDefault();
    const code = generate({ length: 6, special: false, lowerCase: false });
    setCode(code);
    console.log(code);
  }

  return (
    <div className='font-inter'>
      {
        loading ? (
          <></>
        ):(
          <>
            <div className='flex justify-between'>
              <p className='text-3xl font-bold'>Grup</p>
            </div>
            <div className='bg-white w-full mt-10 px-11 py-8'>
              <form onSubmit={handleSubmit}>
                <div className='flex mb-4  w-2/3 items-center'>
                  <label htmlFor="name" className=''>Nama Grup</label>
                  <input  type="text" className='ms-auto' value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className='flex mb-4 w-2/3 items-center'>
                  <label htmlFor="name" className='me-40'>Code</label>
                  <div className='ms-auto'>
                    <button onClick={handleGenerateCode} className='border border-black p-1 align-middle me-2'> <HiOutlineRefresh className='text-2xl '/> </button>
                    <input type="text" value={code} onChange={e => setCode(e.target.value)} disabled/>
                  </div>
                </div>
                <div className='flex justify-end mt-40'>
                  <Link to='/dashboard/grup'>
                    <button className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
                  </Link>
                  <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
                </div>
              </form>
            </div>
          </>
        )
      }
    </div>
    
  )
}
