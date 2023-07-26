import React, { useEffect, useState } from 'react'
import work from '../../src/assets/img/work.png'
import lms from '../../src/assets/img/lms.png'
import { Link, redirect, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm, FormProvider, } from 'react-hook-form'
import { name_validation, password_validation, nim_validation, email_validation } from "../utils/inputValidation";
import { Input } from '../components/Input'


export const LoginStaf = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const methods = useForm();

  const onSubmit = methods.handleSubmit(async data => {
    try {
      const login = await axios.post("http://localhost:8000/api/v1/login", data);
      console.log(login);
      if (login) {
        const token = login.data.data.token;
        const role = login.data.data.role;
        localStorage.setItem("token", token);
        setMessage("Login Berhasil");
        setAlert(true);
        if (role !== 'Mahasiswa') {
          setTimeout(() => { navigate("/dashboard/matkul") }, 1000);
        } else {
          setTimeout(() => { navigate("/") }, 1000);
        }
      }
    }
    catch (error) {
      const dataError = error.response.data.message;
      setError(dataError);
      setAlert(true);
      setTimeout(() => { setAlert(false) }, 3000)

    }
  })

  const handleGetLocalStorang = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }

  useEffect(() => {
    handleGetLocalStorang();
  }, [])

  async function handleLogin(e) {
    try {
      e.preventDefault();
      const data = {
        username: username,
        password: password
      }

      const login = await axios.post("http://localhost:8000/api/v1/login", data);
      console.log(login);
      if (login) {
        const token = login.data.data.token;
        const role = login.data.data.role;
        localStorage.setItem("token", token);
        setMessage("Login Berhasil");
        setAlert(true);
        if (role === null) {
          setTimeout(() => { navigate("/rolecheck") }, 1000);
        }
        else if (role === 'Perusahaan') {
          setTimeout(() => { navigate("/dashboard/grup") }, 1000);
        } else {
          setTimeout(() => { navigate("/") }, 1000);

        }
      }
    } catch (error) {
      const dataError = error.response.data.message;
      setError(dataError);
      setAlert(true);
      setTimeout(() => { setAlert(false) }, 3000)
    }
  }

  return (
    <div className='container mx-auto lg:pt-10'>
      {
        alert ? (
          <div className='relative'>
            {message ? (
              <div className='absolute border py-3 px-4 rounded-full bg-success text-white font-bold top-24 right-0 text-xs lg:right-32 lg:top-0'>
                {message}
                <button onClick={e => setAlert(false)} className='px-1 ms-2'>&#x2715;</button>
              </div>
            ) :
              error ? (
                <div className='absolute border py-3 px-4 rounded-full bg-error text-white font-bold top-24 right-0 text-xs lg:right-32 lg:top-0'>
                  {error}
                  <button onClick={e => setAlert(false)} className='px-1 ms-2'>&#x2715;</button>
                </div>
              ) :
                <></>}
          </div>
        ) :
          <></>
      }

      <p className='text-center font-inter tracking-widest text-2xl font-bold py-3 lg:py-0 uppercase'>
        Login staff
      </p>
      <div className='container lg:flex justify-center'>
        <div className='w-1/2 mt-6'>
          <FormProvider {...methods}>
            <form onSubmit={e => e.preventDefault} noValidate autoComplete='off' className='rounded-large mx-auto p-10 flex-col w-96 text-xs bg-primary text-center'>
              <img src={lms} alt="lms" className='mx-auto w-52 my-2' />
              <div className='mb-3 mt-10'>
                <Input {...name_validation} />
              </div>
              <div className='mb-3'>
                <Input {...password_validation} />
              </div>
              {/* <p className='underline text-blue-400'><a href=""> Lupa Password?</a></p> */}
              <button onClick={onSubmit} className='mt-5 mb-3 bg-secondary rounded-full p-2 w-full text-white text-sm font-bold'>Login</button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
