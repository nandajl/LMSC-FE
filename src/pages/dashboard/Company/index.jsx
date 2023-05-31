import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useUsers } from "./../../../store";

export const Company = () => {
  const getUser = useUsers((state) => state.getUser)

  const [user, setUser] = useState("") 

  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [edit, setEdit] = useState(false)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put('http://localhost:8000/api/v1/company/'+companyId , {
        name: companyName,
        company_code: companyCode
      })
      console.log(response);
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetUser(){
    const response = await getUser()
    setUser(response);
  }

  const handleGetCompany = async () => {
    try {
      console.log(user.company_code);
      const response = await axios.post(`http://localhost:8000/api/v1/company/find`, {
        company_code: user.company_code
      })
      setCompanyId(response.data.data.id)
      setCompanyName(response.data.data.name)
      setCompanyCode(response.data.data.company_code)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetUser();
  },[])
  
  useEffect(() => {
    handleGetCompany();
  },[user])

  return (
    <div className='p-10 w-full bg-white'>
      <h1 className='text-3xl font-medium'>Company Data</h1>
      <div className='flex w-full justify-center'>
        <div className='w-6/12'>
          <div className='flex items-center justify-between mt-10'>
            <label htmlFor="companyName" className='text-lg font-medium '>Company Name</label>
            <input type="text" value={companyName}
               disabled={!edit} onChange={(e) => setCompanyName(e.target.value)}/>
          </div>
          <div className='flex items-center justify-between mt-5'>
            <label htmlFor="companyCode" className='text-lg font-medium'>Company Code</label>
            <input type="text" value={companyCode} onChange={(e) => setCompanyCode(e.target.value)} disabled/>
          </div>
        </div>
        <div className='w-4/12'>
          <img src="https://picsum.photos/id/236/200" alt="" className='mx-auto w-48 h-48' />
        </div>
      </div>
      <div className='flex w-10/12 mt-10 mx-auto '>
        <button className='bg-secondary rounded-full p-2 w-28 text-white text-sm font-bold me-2' onClick={() => setEdit((prev) => !prev)}>
          {
            edit ? "Batal" : "Edit"
          }
        </button>
        {
          edit ? <button className='bg-secondary rounded-full p-2 w-28 text-white text-sm font-bold' onClick={handleSubmit}>Simpan</button> : <></>
        }
      </div>
    </div>
  )
}
