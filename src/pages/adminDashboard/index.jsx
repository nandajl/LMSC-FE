import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';
import { useUsers } from '../../store';
import Sidebars from '../../components/Sidebar';
import { useLogin } from '../../hooks/useLogin';

export const AdminDashboard = () => {
  const [toggledSidebar, setToggledSidebar] = useState(true);

  const username = useLogin();

  return (
    <div className='flex relative'>
      <div className={toggledSidebar ? 'w-full sm:w-72 fixed' : 'hidden'}>
        <Sidebars />
      </div>
      <div className='w-full' style={{ minHeight: '100vh' }}>
        <Navbar toggledSidebar={toggledSidebar} setToggledSidebar={setToggledSidebar} dashboard={true} />
        <div className={`${toggledSidebar ? 'w-4/5 min-h-screen ms-auto flex-grow bg-slate-100' : 'w-full min-h-full bg-slate-100'} py-32 px-16 w-4/5 top-20 -z-10 }`} style={{ minHeight: '100vh' }}>
          <Outlet />
        </div>
      </div>
    </div>

  );
}
