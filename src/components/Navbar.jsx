import React, { useEffect, useState } from 'react'
import lms from '../assets/img/lms-transparant.png'
import { Link, useNavigate } from 'react-router-dom'
import { useUsers } from "../store";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { RxHamburgerMenu } from "react-icons/rx";
import { FiUser } from "react-icons/fi";

export default function Navbar(props) {
  const {  toggledSidebar, setToggledSidebar, dashboard } = props;
  const getUser = useUsers((state) => state.getUser)
  const deleteUser = useUsers((state) => state.deleteUser)

  const [user, setUser] = useState("")
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  async function handleGetUser(){
    const response = await getUser()
    setUser(response);
  }

  useEffect(() => {
    window.onscroll = function() {
      if (window.scrollY > 100) {
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }
  } , [])

  useEffect(() => {
    handleGetUser();
  }, [])

  const handlleLogout = () => {
    localStorage.removeItem('token');
    deleteUser; 
    navigate('/login');
  }

  return (
    <div className={scrolled ? 'flex w-full justify-between h-20 py-3 px-4 bg-primary lg:px-16 fixed top-0 shadow-lg' : 'flex w-full justify-between h-20 py-3 px-4 bg-primary lg:px-16 fixed top-0'}>
      <div className={toggledSidebar ? 'flex gap-44' : 'flex gap-5'}>
        <Link to={'/'}>
          <img src={lms} alt="lms" className='hover:animate-spin'/>
        </Link>
        {
          dashboard ? (
            <button className='text-white text-sm font-bold' onClick={() => setToggledSidebar(!props.toggledSidebar)}><RxHamburgerMenu className='text-3xl' /></button>
          ) : <></>
        }
      </div>
      <div className='flex items-center font-semibold'>
        <ul className='flex items-center'>
          {
            user.role !== "Mahasiswa" ? (
              <li className='px-4 py-3 hover:text-white hover:bg-secondary'><Link to={'/dashboard/matkul'}>Dashboard</Link></li>
            ): (
              <></>
            )
          }
          {
            user ? (
              <li className='px-4 py-3 hover:text-white hover:bg-secondary'><Link to={'/content/grup'}> Service</Link></li>
            ):(<></>)
          }
          <Link to={'/dashboard/matkul'}>
            <li className='px-4 py-3 hover:text-white hover:bg-secondary'>Mata Kuliah</li>
          </Link>
        </ul>
        {
          user.length == 0  ? (
            <Link to='/login'>
              <button className='bg-secondary p-2 float-right text-white text-sm font-bold w-24'>Login</button>
            </Link>
          ) : (
            <div>
              <DropdownMenu.Root className>
                <DropdownMenu.Trigger className='flex items-center hover:text-white active:outline-none px-2 capitalize'>
                  {user.username} 
                  {
                    user.photo ? <img src={user.photo} alt="profile" className='w-12 h-12 rounded-full ms-4' /> : <FiUser className='ms-4 text-3xl  rounded-full hover:border-white'></FiUser>
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

