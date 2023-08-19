import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import { useUsers } from "../../../store";

export default function EditMatkul() {

  const getUser = useUsers((state) => state.getUser);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const { id } = useParams();

  const handleGetUser = async () => {
    const response = await getUser();
    setUser(response);
  }

  async function handleGetCourse() {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/v1/course/${id}`)
      console.log(response);
      setName(response.data.data.name);
      setDescription(response.data.data.description);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }

  
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = {
        name: name,
        description: description
      }
      // console.log(data);
      const response = await axios.put(`http://localhost:8000/api/v1/course/${id}`, data);
      navigate('/admin/matkul');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetCourse();
    handleGetUser();
  }, [])

  return (
    <div className='font-inter'>
      {
        loading ? (
          <></>
        ) : (
          <>
            <div className='flex justify-between'>
              <p className='text-3xl font-bold'>{name}</p>
            </div>
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
