import React, { useEffect } from 'react'
import lms from '../assets/img/lms-transparant.png'
import { Link } from 'react-router-dom'
import { useUsers } from "../store";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CiDesktop } from "react-icons/ci";

export default function Navbar() {
  const user = useUsers((state) => state.user)
  const getUser = useUsers((state) => state.getUser)
  const deleteUser = useUsers((state) => state.deleteUser)
  

  useEffect(() => {
    getUser('http://localhost:8000/api/v1/user');
  }, [])

  const handlleLogout = () => {
    localStorage.removeItem('token');
    deleteUser;
    window.location.reload(true);
  }

  return (
    <div className='flex w-screen justify-between h-20 py-3 px-4 bg-primary lg:px-16 fixed top-0 '>
      <img src={lms} alt="lms" className='hover:animate-spin'/>
      <div className='flex items-center font-semibold'>
        <ul className='flex me-6'>
          <li className='me-6 hover:text-white'><a href="/content/grup">Service</a></li>
          <li><a href="" className='hover:text-white'>About Us</a></li>
        </ul>
        {
          user.length == 0  ? (
            <Link to='/login'>
              <button className='bg-secondary p-2 float-right text-white text-sm font-bold w-24'>Login</button>
            </Link>
          ) : (
            <div>
              <DropdownMenu.Root className>
                <DropdownMenu.Trigger className='flex items-center hover:text-white active:outline-none px-2'>
                  {user.firstName} {user.lastName} <CiDesktop className='text-3xl ms-3'/>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className='w-32  bg-white rounded-md py-1 px-1'> 
                    <DropdownMenu.Item className='items-center rounded-sm px-3 py-1 hover:bg-primary hover:outline-none'>
                      <button onClick={handlleLogout}>Logout</button>
                    </DropdownMenu.Item>  
                    <DropdownMenu.Arrow className=' fill-white'/>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

            </div>
            

          )
        }

      </div>

    </div>
  )
}

