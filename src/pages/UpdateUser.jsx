import axios from 'axios';
import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


export const UpdateUser = () => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

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
          setUsername(res.data.data.username);
        }).catch(res=> console.log(res));
    }

    async function handleUpdateUser(e) {
        e.preventDefault();

        const update = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            address: address
        }

        await axios.put(`http://localhost:8000/api/v1/users/${id}`, update).then(res => {
            navigate('/')
        }).catch(error => {
            console.log(error);
        });
    }

  return (
    <div className='flex w-screen'>
        <form onSubmit={handleUpdateUser} className='w-3/4 border border-secondary rounded-3xl lg:rounded-large py-8 lg:py-14 px-7 lg:px-20 mt-20 mx-auto overflow-auto no-scrollbar'>
            <p className='text-secondary font-bold text-lg'>Data User</p>
            
            <div className='flex flex-col mt-5'>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" className='border border-secondary rounded-full px-4 py-1 mt-2 ' required disabled/>
            </div>
            <div className='flex flex-col mt-5'>
                <label >Nama Lengkap</label>
                <div>
                    <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" className='border border-secondary rounded-full px-4 py-1 mt-2 w-1/2' required/>
                    <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" className='border border-secondary rounded-full px-4 py-1 mt-2 w-1/2 ' required/>
                </div>
            </div>
            <div className='flex flex-col mt-5'>
                <label >Nomor Telepon</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} type="text" className='border border-secondary rounded-full px-4 py-1 mt-2 ' required/>
            </div>
            <div className='flex flex-col mt-5'>
                <label>Alamat</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} type="text" className='border border-secondary rounded-3xl px-4 py-3 mt-2 h-32' required/>
            </div>
            <button className='bg-secondary rounded-full p-2 float-right text-white text-sm font-bold w-40 mt-5'>Submit</button>
        </form>
    </div>
  )
}
