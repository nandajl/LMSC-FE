import React, { useEffect, useState } from 'react'
import lms from '../assets/img/lms-transparant.png'
import { Link, useNavigate } from 'react-router-dom'
import { useUsers } from "../store";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { RxHamburgerMenu } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import axios from 'axios';

export default function Navbar(props) {
  const {  toggledSidebar, setToggledSidebar, dashboard } = props;
  const getUser = useUsers((state) => state.getUser)
  const deleteUser = useUsers((state) => state.deleteUser)
  
  const [user, setUser] = useState("");
  const [toggleMenu, setToggleMenu] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationRead, setNotificationRead] = useState([]);

  const navigate = useNavigate();

  async function handleGetUser(){
    const response = await getUser()
    setUser(response);
  }

  const handleGetNotification = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/notification/user', {
        user_id: user.id
      })
      console.log(response.data);
      setNotification(response.data);
      // response.data.map(item => {
      //   console.log(item.is_read);
      // })
      const filterNotification = response.data.filter(item => item.is_read == false)
      setNotificationRead(filterNotification);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateNotification = async (id, idMatkul) => {
    try {
      setNotificationRead([]);
      const response = await axios.put('http://localhost:8000/api/v1/notification/'+id, {
        is_read: true
      })
      if (response) {
        navigate('/dashboard/matkul/detail/' + idMatkul);
      }
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    if (user) {
      handleGetNotification();
    }
  }, [user])

  const handlleLogout = () => {
    localStorage.removeItem('token');
    deleteUser; 
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      navigate('/login');
    }
    navigate('/');
  }

  return (
    <div className={scrolled ? 'flex w-full justify-between h-20 py-3 px-4 bg-primary lg:px-16 fixed top-0 shadow-lg' : 'flex w-full justify-between h-20 py-3 px-4 bg-primary lg:px-16 fixed top-0'}>
      <div className={toggledSidebar ? 'flex item-center gap-44' : 'flex gap-5'}>
        <Link to={'/'}>
          <img src={lms} alt="lms" className='hover:animate-spin'/>
        </Link>
        {
          user.role === "Admin" && (
        dashboard ? (
            <button className='text-white text-sm font-bold' onClick={() => setToggledSidebar(!props.toggledSidebar)}><RxHamburgerMenu className='text-3xl' /></button>
            ) : <></>
          )
          }
      </div>
      {
        toggleMenu ? (
          <></>
          // <div className='h-screen w-1/2 z-10 p-5 bg-white md:hidden '>
          //   <button className='text-black float-right text-sm font-bold' onClick={() => setToggleMenu(!toggleMenu)}><AiOutlineClose className='text-3xl' /></button>
          // </div>
        ) : (
          <button className='md:hidden text-white text-sm font-bold' onClick={() => setToggleMenu(!toggleMenu)}><RxHamburgerMenu className='text-3xl' /></button>
        )
      }
      
      <div className='hidden sm:flex items-center font-semibold'>
        <ul className='flex items-center'>
          {
            user.role !== "Admin" ? (
              <li className='px-4 py-3 hover:text-white hover:bg-secondary'><Link to={'/content/feedback'}>Feedback</Link></li>
            ): (
              <></>
            )
          }
          {
            user.role === "Admin" ? (
              <li className='px-4 py-3 hover:text-white hover:bg-secondary'><Link to={'/admin/main'}>Dashboard</Link></li>
            ): (
              <></>
            )
          }
          {
            user.role !== "Admin" ? (
              // <li className='px-4 py-3 hover:text-white hover:bg-secondary'><Link to={'/content/grup'}> Service</Link></li>
              <Link to={'/dashboard/matkul'}>
                <li className='px-4 py-3 hover:text-white hover:bg-secondary'>Mata Kuliah</li>
              </Link>
              ):(<></>)
          }
        </ul>
        <DropdownMenu.Root className>
          <DropdownMenu.Trigger className='flex items-center hover:text-white active:outline-none px-2 capitalize'>
              <IoMdNotificationsOutline className='text-2xl'/>{notificationRead.length > 0 ? <p className='text-xs text-white bg-red-500 rounded-full px-1'>{notificationRead.length}</p> : <></>}
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className='w-full bg-white rounded-md py-1 px-1'> 
              {
                notification.length > 0 ? (
                  (notification.sort((a, b) => a.is_read - b.is_read),
                  notification.map(item => {
                    return (
                      <DropdownMenu.Item className={`${item.is_read ? 'bg-white' : 'bg-primary'} border-b-2 items-center rounded-sm px-3 py-4 hover:bg-primary hover:outline-none`} key={item.id}>
                        <button onClick={()=>handleUpdateNotification(item.id, item.course_id)}>
                          {item.message}
                        </button>
                      </DropdownMenu.Item>)
                  }))
                ):(
                  <DropdownMenu.Item className='items-center rounded-sm px-3 py-1 hover:bg-primary hover:outline-none'>
                    <p>Tidak ada notification</p>  
                  </DropdownMenu.Item>  
                  
                )
              }
              <DropdownMenu.Arrow className=' fill-white'/>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

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

