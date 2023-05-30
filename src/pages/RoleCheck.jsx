import React from 'react'
import employee from '../../src/assets/img/employee.png'
import company  from '../../src/assets/img/company.png'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from "../store";
import { generate } from '@wcj/generate-password';

export const RoleCheck = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [user, setUser] = useState("")
  const [companyId, setCompanyId] = useState("")
  
  const getUser = useUsers((state) => state.getUser);

  async function handleGetUser(){
    const response = await getUser('http://localhost:8000/api/v1/user')
    console.log(response);
    setUser(response);
  }
  
  useEffect(() => {
    handleGetUser();
  }, []);

  const handleCreateCompany = async () => {
    try {
      const code = generate({ length: 6, special: false, lowerCase: false });
      const response = await axios.post('http://localhost:8000/api/v1/company', {
        name: "",
        company_code: code
      })
      return response.data.data.company_code
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateUser(e) {
    try {
      e.preventDefault();
      
      const update = e.target.innerText;
      const result = await axios.put(`http://localhost:8000/api/v1/users/${user.id}`, {
        role: update
      })
      if (update === "Perusahaan") {
        const company_code = await handleCreateCompany();
        console.log(companyId);
        navigate(`/update-user?company_code=${company_code}`) 
        return
      }
      navigate('/update-user')

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
