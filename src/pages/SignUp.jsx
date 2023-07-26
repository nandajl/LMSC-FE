import React, { Component, useEffect, useState } from 'react'
import work from '../../src/assets/img/work.png'
import lms from '../../src/assets/img/lms.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '../components/Input'
import { name_validation, password_validation, nim_validation, email_validation } from "../utils/inputValidation";

export const SignUp = () => {
  const [nim, setNim] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // const { register } = useFormContext();
  const methods = useForm();

  const onSubmit = methods.handleSubmit(async data => {
    try {
      const register = await axios.post("http://localhost:8000/api/v1/register", data);
      if (register) {
        setMessage("Register Berhasil");
        setAlert(true);
        console.log(alert, message);
        setTimeout(() => { navigate("/login") }, 1000)
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

  function checkPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      setError("Password Tidak Sama");
      setAlert(true);
      setTimeout(() => { setAlert(false) }, 3000)
      return false;
    }
  }

  return (
    <div className='container mx-auto pt-10'>
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
      <p className='text-center font-inter tracking-widest text-2xl font-bold py-3 lg:py-0'>
        For Best Learning <br /> Experience
      </p>
      <div className='container lg:flex'>
        <div className='hidden lg:w-1/2 lg:block'>
          <img src={work} alt='work' className='mx-auto' />
        </div>
        <div className='w-1/2 '>
          <FormProvider {...methods}>
            <form onSubmit={e => e.preventDefault} noValidate autoComplete='off' className='rounded-large mx-auto p-10 flex-col w-96 text-xs bg-primary text-center'>
              <img src={lms} alt="lms" className='mx-auto w-28 my-2' />
              <div className='mb-3 mt-10'>
                <Input {...nim_validation}/>
              </div>
              <div className='mb-3'>
                <Input {...name_validation}/>
              </div>
              <div className='mb-3'>
                <Input {...email_validation}/>
              </div>
              <div className='mb-3'>
                <Input {...password_validation}/>
              </div>
              <button onClick={onSubmit} className='mt-5 mb-3 bg-secondary rounded-full p-2 w-full text-white text-sm font-bold'>Sign Up</button>
              <p>Sudah punya akun? <Link to="/login"><span className='underline text-blue-400'>Login</span></Link> </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
