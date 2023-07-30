import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const CreateUser = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Dosen")

  async function handleSubmit(e){
    try {
      e.preventDefault();
      const data = {
        username: username,
        email: email,
        password: password,
        role: role
      }
      console.log(data);
      const response = await axios.post('http://localhost:8000/api/v1/register', data);
      if (response.status === 201) {
        navigate('/admin/user')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='flex justify-between font-inter'>
        <p className='text-3xl font-bold'>Buat User</p>
      </div>
      <div className='bg-white w-full mt-10 px-11 py-8'>
        <form onSubmit={handleSubmit}>
          <div className='flex mb-4  w-full items-center'>
            <label>Username</label>
            <input type="text" className='ms-auto w-1/2' value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className='flex mb-4  w-full items-center'>
            <label>Email</label>
            <input type="text" className='ms-auto w-1/2' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='flex mb-4  w-full items-center'>
            <label>Password</label>
            <input type="text" className='ms-auto w-1/2' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='flex mb-4  w-full items-center'>
            <label>Role</label>
            <select name="role" id="role" onChange={e => setRole(e.target.value)} className='ms-auto w-1/2'>
              <option value="Dosen" selected>Dosen</option>
              <option value="Mahasiswa">Mahasiswa</option>
            </select>
          </div>
          <div className='flex justify-end mt-40'>
            <Link to='/dashboard/matkul'>
              <button onClick={() => setIsAdding(false)} className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
            </Link>
            <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
          </div>
        </form>
      </div>
    </>
  )
}
