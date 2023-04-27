import React from 'react'
import employee from '../../src/assets/img/employee.png'
import company  from '../../src/assets/img/company.png'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const RoleCheck = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  
  useEffect(() => {
    console.log('page loaded');
    getUserData();
  }, [])

  function getUserData() {
      const localToken = localStorage.getItem('token');
      console.log(localToken);
      axios.get("http://localhost:8000/api/v1/user", {
       headers: {
        Authorization: `Bearer ${localToken}` 
       }
      }).then(res => {
        setId(res.data.data.id);
      }).catch(res=> console.log(res));
  }

  async function handleUpdateUser(e) {
    try {
      e.preventDefault();
  
      const update = e.target.innerText;
      
      await axios.put(`http://localhost:8000/api/v1/users/${id}`, {
        role: update
      }).then(res => {
        navigate('/update-user')
      });
      
      
    } catch (error) {
      console.log(error);
    }


  }

  return (
    <div className='h-screen justify-center lg:flex lg:flex-col'>
        <div className='text-center font-inter tracking-widest text-2xl font-bold py-3 mt-9  lg:-mt-14 mb-10 lg:py-0 '>
            Pilih Role
        </div>
        <div className='justify-evenly lg:flex '>    
            <div className='flex flex-col items-center'>
              <img src={employee} alt="employee" className='w-56 h-64 border border-secondary rounded-large p-8 '/>
              <button onClick={handleUpdateUser} className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-48 mt-5 hover:bg-blue-500 active:ring active:ring-secondary active:bg-blue-500'>Pegawai</button>
            </div>
            <div className='mt-10 flex flex-col items-center lg:mt-0'>
              <img src={company} alt="company" className='border border-secondary rounded-large p-8 w-56 h-64'/>
              <button onClick={handleUpdateUser} className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-48 mt-5  hover:bg-blue-500 active:ring active:ring-secondary active:bg-blue-500'>Perusahaan</button>
            </div>
        </div>
    </div>
  )
}
