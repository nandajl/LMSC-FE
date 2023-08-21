import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

export default function CreateMatkul() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = {
        name: name,
        description: description
      }
      // console.log(data);
      const response = await axios.post(`http://localhost:8000/api/v1/course/`, data);
      navigate('/admin/matkul');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='font-inter'>
      <div className='flex justify-between font-inter'>
        <p className='text-3xl font-bold'>Mata Kuliah</p>
      </div>
      {
        loading ? (
          <></>
        ) : (
          <>
            <div className='bg-white w-full mt-10 px-11 py-8'>
              <form onSubmit={handleSubmit}>
                <div className='flex mb-4 w-full items-center'>
                  <label htmlFor="name" className=''>Nama Mata Kuliah</label>
                  <input type="text" className='ms-auto w-2/3' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='flex mb-4 w-full justify-between'>
                  <label htmlFor="description" className='me-40'>Deskripsi</label>
                  <textarea type="text" className='w-2/3 h-40' value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className='flex justify-end mt-40'>
                  <Link to='/dashboard/matkul'>
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
