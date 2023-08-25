import DoughnutChart from "../../../components/DoughnutChart";
import PieChart from "../../../components/PieChart";
import React, { useEffect, useState } from 'react'
import { StatistikCard } from "../../../components/StatistikCard";
import axios from 'axios';
import { REACT_APP_DEV_MODE } from "../../../utils/url";


export const Main = () => {
  const [userMhs, setUserMhs] = useState([]);
  const [userDosen, setUserDosen] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [enrollment, setEnrollment] = useState([]);
  const [activeClass, setActiveClass] = useState([]);
  const [activeMhs, setActiveMhs] = useState([]);
  const [activeDosen, setActiveDosen] = useState([]);
  const [matkul, setMatkul] = useState([]);
  const [activeMatkul, setActiveMatkul] = useState([]);

  const handleGelAllUser = async () => {
    try {
      const response = await axios.get(`${REACT_APP_DEV_MODE}/users`);
      setUserMhs(response.data.data.filter((item) => item.role === 'Mahasiswa'));
      setUserDosen(response.data.data.filter((item) => item.role === 'Dosen'));
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetClass = async () => {
    try {
      const response = await axios.get(`${REACT_APP_DEV_MODE}/class`);
      setKelas(response.data.data);
      const matkulDistict = [...new Set(response.data.data.map(item => item.course_id))];
      const dosen1 = [...new Set(response.data.data.map(item => item.dosen_id_1))];
      const dosen2 = [...new Set(response.data.data.map(item => item.dosen_id_2))];
      const dosenDistinct = [...new Set([...dosen1, ...dosen2])];
      setActiveDosen(dosenDistinct);
      setActiveMatkul(matkulDistict);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetEnrollment = async () => {
    try {
      const response = await axios.get(`${REACT_APP_DEV_MODE}/enrollment`);
      setEnrollment(response.data);
      const kelasDistinct = [...new Set(response.data.map(item => item.class_id))];
      const userDistinct = [...new Set(response.data.map(item => item.user_id))];
      setActiveClass(kelasDistinct);
      setActiveMhs(userDistinct);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetMatkul = async () => {
    try {
      const response = await axios.get(`${REACT_APP_DEV_MODE}/course`);
      setMatkul(response.data.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGelAllUser();
    handleGetClass();
    handleGetEnrollment();
    handleGetMatkul();
  }, [])


  const dataMhs = {
    labels: ['Mahasiswa aktif', 'Mahasiswa tidak aktif'],
    datasets: [
      {
        id: 1,
        label: 'Mahasiswa',
        data: [activeMhs.length, (userMhs.length - activeMhs.length)]
      }
    ],
  }

  const dataDosen = {
    labels: ['Dosen aktif', 'Dosen tidak aktif'],
    datasets: [
      {
        id: 1,
        label: 'Dosen',
        data: [activeDosen.length, (userDosen.length - activeDosen.length)]
      }
    ],
  }

  const dataClass = {
    labels: ['Kelas aktif', 'Kelas tidak aktif'],
    datasets: [
      {
        id: 1,
        label: 'Kelas',
        data: [activeClass.length, (kelas.length - activeClass.length)]
      }
    ],
 
  }
  const dataMatkul = {
    labels: ['Mata Kuliah aktif', 'Mata Kuliah tidak aktif'],
    datasets: [
      {
        id: 1,
        label: 'Mata Kuliah',
        data: [matkul.length, (matkul.length - activeMatkul.length)]
      }
    ],
  }

  return (
    <>
      <div className='flex justify-between mb-8'>
        <p className='text-3xl font-bold'>Dashboard</p>
      </div>
      <div className='flex gap-3 w-full flex-wrap'>
        <StatistikCard>
          <p className='font-bold text-lg'>Total Mahasiswa :<span className="text-4xl font-extrabold float-right">{userMhs.length}</span></p>
          <div className="w-52 h-52 mx-auto">
            <PieChart chartData={dataMhs} />
          </div>
        </StatistikCard>
        <StatistikCard>
          <p className='font-bold text-lg'>Total Dosen :<span className="text-4xl font-extrabold float-right">{userDosen.length}</span></p>
          <div className="w-52 h-52 mx-auto">
            <PieChart chartData={dataDosen} />
          </div>
        </StatistikCard>
        <StatistikCard>
          <p className='font-bold text-lg'>Total Kelas :<span className="text-4xl font-extrabold float-right">{kelas.length}</span></p>
          <div className="w-52 h-52 mx-auto">
            <PieChart chartData={dataClass} />
          </div>
        </StatistikCard>
        <StatistikCard>
          <p className='font-bold text-lg'>Total Mata Kuliah :<span className="text-4xl font-extrabold float-right">{matkul.length}</span></p>
          <div className="w-52 h-52 mx-auto">
            <PieChart chartData={dataMatkul} />
          </div>
        </StatistikCard>
      </div>
    </>
  )
}
