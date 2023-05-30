import React, { useEffect, useState } from 'react'
import lms from '../assets/img/lms-transparant.png'
import { Link, useNavigate } from 'react-router-dom'
import { useUsers } from "../store";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar(props) {
  const {  toggledSidebar, setToggledSidebar } = props;
  const getUser = useUsers((state) => state.getUser)
  const deleteUser = useUsers((state) => state.deleteUser)

  const [user, setUser] = useState("")

  const navigate = useNavigate();

  async function handleGetUser(){
    const response = await getUser()
    setUser(response);
  }

  useEffect(() => {
    handleGetUser();
  }, [])

  const handlleLogout = () => {
    localStorage.removeItem('token');
    deleteUser; 
    navigate('/login');
  }

  return (
    <div className='flex w-full justify-between h-20 py-3 px-4 bg-primary lg:px-16 fixed top-0 '>
      <div className={toggledSidebar ? 'flex gap-44' : 'flex gap-5'}>
        <Link to={'/'}>
          <img src={lms} alt="lms" className='hover:animate-spin'/>
        </Link>
        <button className='text-white text-sm font-bold' onClick={() => setToggledSidebar(!props.toggledSidebar)}><RxHamburgerMenu className='text-3xl' /></button>
      </div>
      <div className='flex items-center font-semibold'>
        <ul className='flex me-6 gap-5'>
          {
            user.role === "Perusahaan" ? (
              <li className='hover:text-white'><a href="/dashboard/grup">Dashboard</a></li>
            ): (
              <></>
            )
          }
          <li className='hover:text-white'><a href="/content/grup">Service</a></li>
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
                  {user.firstName} {user.lastName} 
                  {
                    user.photo ? <img src={user.photo} alt="profile" className='w-12 h-12 rounded-full ms-4' /> : <></>
                  }
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className='w-32  bg-white rounded-md py-1 px-1'> 
                    <DropdownMenu.Item className='items-center rounded-sm px-3 py-1 hover:bg-primary hover:outline-none'>
                      <button onClick={()=> {navigate('/update-user')}}>Setting</button>
                    </DropdownMenu.Item>  
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

