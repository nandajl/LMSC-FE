import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from "react-router-dom";
import { REACT_APP_DEV_MODE } from "../../../../utils/url";
import axios from 'axios';
import { Tabs } from "flowbite-react";
import Card from "../../../../components/Card";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlusCircle } from 'react-icons/ai';
import { useUsers } from "../../../../store";

export const DetailCourse = () => {
  const getUser = useUsers((state) => state.getUser)

  const [user, setUser] = useState("");
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enrollment, setEnrollment] = useState([]);


  async function handleGetUser() {
    const response = await getUser()
    setUser(response);
  }

  const handleGetCourse = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${REACT_APP_DEV_MODE}/course/${id}`);
      console.log(response.data.data);
      setCourse(response.data.data)
      setAssignments(response.data.data.Assignments);
      setLessons(response.data.data.Lessons);
      setTests(response.data.data.Tests);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetEnrollment = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${REACT_APP_DEV_MODE}/enrollment/user`, {
        course_id: id
      })
      console.log(response);
      setEnrollment(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemmoveEnrollment = async (id) => {
    try {
      alert('Yakin ingin menghapus?')
      await axios.delete(`${REACT_APP_DEV_MODE}/enrollment/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetCourse();
    handleGetUser();
    handleGetEnrollment();
  }, []);

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold capitalize'>{course.name}</p>
        {
          user.role === "Mahasiswa" ? (
            <></>
          ) : (
            <Link to={'/dashboard/matkul/edit/' + course.id}>
              <AiOutlineEdit className='text-5xl border-2 border-black hover:text-gray-400 hover:border-gray-400' />
            </Link>
          )
        }
      </div>
      <hr className='my-3' />
      <div className=''>
        {
          loading ? (
            <></>
          ) : (
            <Tabs.Group
              aria-label="Default tabs"
              style="default"
            >
              <Tabs.Item
                active
                title="Tentang"
              >
                <p className='mb-3'>{course.description}</p>
                {
                  user.role !== "Mahasiswa" && (
                    <p>Code : {course.code}</p>
                  )
                }
              </Tabs.Item>
              <Tabs.Item
                title="Materi"
              >
                <>
                  {
                    user.role === "Mahasiswa" ? (
                      <></>
                    ) : (
                      <div className='flex justify-end'>
                        <Link to={'/dashboard/materi/create/' + course.id}>
                          <AiOutlinePlusCircle className='text-5xl hover:text-gray-400' />
                        </Link>
                      </div>
                    )
                  }
                  <div className='flex gap-5'>
                    {
                      lessons.length > 0 ? (
                        lessons.map((lesson) => {
                          return <Link to={'/dashboard/materi/detail/' + lesson.id} key={lesson.id}>
                            <Card key={lesson.id} lesson={lesson} />
                          </Link>
                        })
                      ) : (
                        <p>Belum Ada Materi Pelajaran</p>
                      )
                    }
                  </div>
                </>
              </Tabs.Item>
              <Tabs.Item
                title="Tugas"
              >
                {
                  user.role === "Mahasiswa" ? (
                    <></>
                  ) : (
                    <div className='flex justify-end'>
                      <Link to={'/dashboard/assignment/create/' + course.id}>
                        <AiOutlinePlusCircle className='text-5xl hover:text-gray-400' />
                      </Link>
                    </div>
                  )
                }
                <div className='flex flex-col gap-5 mt-5'>
                  {
                    assignments.length > 0 ? (
                      assignments.map((assignment) => {
                        return <Link to={'/dashboard/assignment/detail/' + assignment.id} key={assignment.id}>
                          <Card key={assignment.id} assignment={assignment} />
                        </Link>
                      })
                    ) : (
                      <p>Belum Ada Tugas</p>
                    )
                  }
                </div>
              </Tabs.Item>
              <Tabs.Item
                title="Quiz/Test"
              >
                {
                  user.role === "Mahasiswa" ? (
                    <></>
                  ) : (
                    <div className='flex justify-end'>
                      <Link to={'/dashboard/test/create/' + course.id}>
                        <AiOutlinePlusCircle className='text-5xl hover:text-gray-400' />
                      </Link>
                    </div>
                  )
                }
                <div className='flex gap-5'>
                  {
                    tests.length > 0 ? (
                      tests.map((test) => {
                        return <Link to={'/dashboard/test/detail/' + test.id} key={test.id}>
                          <Card key={test.id} test={test} />
                        </Link>
                      })
                    ) : (
                      <p>Belum Ada Test</p>
                    )
                  }

                </div>
              </Tabs.Item>
              {
                user.role !== "Mahasiswa" ? (
                  <Tabs.Item
                    title="Daftar Mahasiswa"
                  >
                    <div className='flex gap-5'>
                      {
                        enrollment.length > 0 ? (
                          <div className='overflow-x-auto shadow-lg w-full'>
                          <table className='w-full'>
                            <thead className='bg-gray-700'>
                              <tr>
                                <th scope="col"
                                  className="px-6 w-10 py-3 text-xs font-bold text-left text-white uppercase "
                                >
                                  No
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">
                                  NIM
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">
                                  Nama Mahasiswa
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">
                                  Aksi
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 ">
                              {
                                enrollment.map((item, index) => (
                                  <tr className='bg-white' key={index}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {index + 1}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {item.User.nim}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {item.User.username}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      <button onClick={(event) => handleRemmoveEnrollment(item.id)}><AiOutlineDelete className='text-2xl text-red-600 border-2 border-error' /></button>
                                    </td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                          </div>
                        ) : (
                          <p>Belum ada Mahasiswa</p>
                        )
                      }

                    </div>
                  </Tabs.Item>
                ) : (
                  <></>
                )
              }
            </Tabs.Group>
          )
        }

      </div>
    </div>
  )
}
