import React, { useEffect, useState } from 'react'
import { HiOutlineRefresh } from "react-icons/hi";
import { generate } from '@wcj/generate-password';
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import { useUsers } from "../../../store";
import { REACT_APP_DEV_MODE } from "../../../utils/url"


export default function EditCourse() {

  const getUser = useUsers((state) => state.getUser);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [dosen, setDosen] = useState([]);
  const [course, setCourse] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [courseData, setCourseData] = useState("");
  const [courseUser1, setCourseUser1] = useState("");
  const [courseUser2, setCourseUser2] = useState("");
  const [courseUserId1, setCourseUserId1] = useState("");
  const [courseUserId2, setCourseUserId2] = useState("");
  const [tahunAjaran, setTahunAjaran] = useState("");
  const { id } = useParams();

  const handleGetUser = async () => {
    const response = await getUser();
    setUser(response);
  }

  async function handleGetCourse() {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/v1/class/${id}`)
      console.log(response);
      setName(response.data.data.name);
      setCode(response.data.data.code);
      setDescription(response.data.data.description);
      setTahunAjaran(response.data.data.tahun_ajaran);
      setCourseId(response.data.data.course_id);
      setCourseData(response.data.data.Course);
      setCourseUser1(response.data.data.dosen_1);
      setCourseUser2(response.data.data.dosen_2);
      console.log(courseUser2);
      setCourseUserId1(response.data.data.dosen_id_1);
      setCourseUserId2(response.data.data.dosen_id_2);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = {
        name: name,
        code: code,
        description: description,
        tahun_ajaran: tahunAjaran,
        dosen_id_1 : parseInt(courseUserId1),
        dosen_id_2 : parseInt(courseUserId2),
        course_id: courseId
      }
      console.log(data);
      const response = await axios.put(`http://localhost:8000/api/v1/class/${id}`, data);
      if (user.role === "Admin") {
        navigate('/admin/class');
      }else{
        navigate('/dashboard/matkul');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleFindUser = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/users/find`, {
        role: "Dosen"
      });
      setDosen(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetMatkul = async () => {
    try {
      const response = await axios.get(`${REACT_APP_DEV_MODE}/course`);
      setCourse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetCourse();
    handleGetUser();
    handleFindUser();
    handleGetMatkul();
  }, [])
  
  function handleGenerateCode(e) {
    e.preventDefault();
    const code = generate({ length: 6, special: false, lowerCase: false });
    setCode(code);
    console.log(code);
  }

  return (
    <div className='font-inter'>
      {
        loading ? (
          <></>
        ) : (
          <>
            <div className='flex justify-between'>
              <p className='text-3xl font-bold'>{name}</p>
            </div>
            <div className='bg-white w-full mt-10 px-11 py-8'>
              <form onSubmit={handleSubmit}>
                <div className='flex mb-4 w-full items-center'>
                  <label htmlFor="name" className=''>Nama Mata Kuliah</label>
                  <input type="text" className='ms-auto w-2/3' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='flex mb-4 w-full items-center'>
                  <label htmlFor="name" className='me-40'>Code</label>
                  <div className='ms-auto w-2/3'>
                    <button onClick={handleGenerateCode} className='border border-black p-1 align-middle me-2'> <HiOutlineRefresh className='text-2xl ' /> </button>
                    <input type="text"  value={code} onChange={e => setCode(e.target.value)} disabled />
                  </div>
                </div>
                <div className='flex mb-4 w-full items-center'>
                  <label htmlFor="name" className='me-40'>Tahun Ajaran</label>
                  <div className='ms-auto w-2/3'>
                    <select name="tahun_ajaran" onChange={e => setTahunAjaran(e.target.value)} >
                      <option value={tahunAjaran} hidden>{tahunAjaran}</option>
                      <option value="2022/2023" >2022/2023</option>
                      <option value="2023/2024" >2023/2024</option>
                    </select>
                  </div>
                </div>
                {
                  user.role === "Admin" && (
                    <>
                      <div className='flex mb-4 w-full items-center'>
                        <label htmlFor="name" className=''>Mata Kuliah</label>
                        <select name="course" onChange={e => setCourseId(e.target.value)} className='ms-auto w-2/3'>
                        <option value={courseId} hidden>{courseData.name}</option>
                        {
                          course.map(course => <option value={course.id}>{course.name}</option>)

                        }
                        </select>
                      </div>
                      <div className='flex mb-4 w-full items-center'>
                        <label htmlFor="name" className=''>Dosen Pengampu Mata Kuliah 1</label>
                        <select name="dosen" onChange={e => setCourseUserId1(e.target.value)} className='ms-auto w-2/3'>
                        {/* <option value={courseUserId1} hidden>{courseUser1.username}</option> */}
                        {
                          courseUser1 === null ? (
                            <option value={null} >Kosong</option>
                          ):(
                            <>
                              <option value={courseUserId1} hidden>{courseUser1.username}</option>
                              <option value="" >Kosong</option>
                            </>
                          )
                        }
                        {
                          dosen.map(dosen => <option value={dosen.id}>{dosen.username}</option>)

                        }
                        </select>
                      </div>
                      <div className='flex mb-4 w-full items-center'>
                        <label htmlFor="name" className=''>Dosen Pengampu Mata Kuliah 2</label>
                        <select name="dosen" onChange={e => setCourseUserId2(e.target.value)} className='ms-auto w-2/3'>
                        {
                          courseUser2 === null ? (
                            <option value={null} >Kosong</option>
                          ):(
                            <>
                              <option value={courseUserId2} hidden>{courseUser2.username}</option>
                              <option value="" >Kosong</option>
                            </>
                          )
                        }
                        {
                          dosen.map(dosen => <option value={dosen.id}>{dosen.username}</option>)

                        }
                        </select>
                      </div>
                    </>
                  )
                }
                <div className='flex mb-4 w-full justify-between'>
                  <label htmlFor="description" className='me-40'>Deskripsi</label>
                  <textarea type="text" className='w-2/3 h-40' value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className='flex justify-end mt-40'>
                  <Link to='/dashboard/matkul'>
                    <button className='border border-secondary rounded-full p-2 text-secondary text-sm font-bold w-32 me-3'>Batal</button>
                  </Link>
                  <button type='submit' className='bg-secondary rounded-full p-2 text-white text-sm font-bold w-32'>Simpan</button>
                </div>
              </form>
            </div>
          </>
        )
      }
    </div>

  )
}
