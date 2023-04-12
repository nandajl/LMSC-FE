import React, { useState } from 'react'
import employee from '../../src/assets/img/employee.png'
import lms from '../../src/assets/img/lms.png'
import { Link, redirect, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[error, setError] = useState("");
    const[alert, setAlert] = useState(false);
    const [message, setMessage] =useState("");

    const navigate = useNavigate();
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

          localStorage.setItem("token", token);
          setMessage("Login Berhasil");
          setAlert(true);
          console.log(alert, message);
        }
        
        setTimeout(() => {navigate("/")}, 1000); 
 
        
      } catch (error) {
        const dataError = error.response.data.message;
        setError(dataError);
        setAlert(true);
        setTimeout(()=>{setAlert(false)}, 3000)
      }
    }

    return (
      <div className='container mx-auto lg:pt-10'>
        {
          alert ? (
            <div className='relative'>
              {message ?  (
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
            <img src={employee} alt='employee' className='mx-auto'/>
          </div>
          <div className='w-1/2 '>
            <form onSubmit={handleLogin} className='rounded-large mx-auto p-10 flex-col w-96 text-xs bg-primary text-center'>
            <img src={lms} alt="lms" className='mx-auto w-52 my-2'/>
              <div className='mb-3 mt-10'>
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" className=' rounded-full w-full py-3 px-5 text-xs' required placeholder='Username'/>
              </div>
              <div className='mb-3'>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className=' rounded-full w-full py-3 px-5 text-xs' required placeholder='Password'/>
              </div>
              <p className='underline text-blue-400'><a href=""> Lupa Password?</a></p>
              <button type='submit' className='mt-5 mb-3 bg-secondary rounded-full p-2 w-full text-white text-sm font-bold'>Login</button>
              <p>Belum punya akun? <Link to="/signup"><span className='underline text-blue-400'> Sign up</span></Link></p>
            </form>
          </div>
        </div>
      </div>
    )
}
