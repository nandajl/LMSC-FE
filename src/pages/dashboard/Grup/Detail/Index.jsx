import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from "react-router-dom";
import { REACT_APP_DEV_MODE } from "../../../../utils/url";
import axios from 'axios';
import { Tabs } from "flowbite-react";
import Card from "../../../../components/Card";
import { AiOutlineEdit, AiOutlinePlusCircle } from 'react-icons/ai';
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


  async function handleGetUser(){
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

  useEffect(() => {
    handleGetCourse();
    handleGetUser();
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
              <AiOutlineEdit className='text-5xl border-2 border-black hover:text-gray-400 hover:border-gray-400'/> 
            </Link>
          )
        }
      </div>
      <hr className='my-3' />
      <div className=''>
        {
          loading ? (
            <></>
          ):(
          <Tabs.Group
            aria-label="Default tabs"
            style="default"
          >
            <Tabs.Item
              active
              title="Tentang"
            >
              <p className='mb-3'>{course.description}</p>
              <p>Code : {course.code}</p>
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
                      <Link to={'/dashboard/materi/create/'+course.id}>
                        <AiOutlinePlusCircle className='text-5xl hover:text-gray-400'/> 
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
                  ):(
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
                    <Link to={'/dashboard/assignment/create/'+course.id}>
                      <AiOutlinePlusCircle className='text-5xl hover:text-gray-400'/> 
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
                  ):(
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
                    <Link to={'/dashboard/test/create/'+course.id}>
                      <AiOutlinePlusCircle className='text-5xl hover:text-gray-400'/> 
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
                  ):(
                    <p>Belum Ada Test</p>
                  )
                }

              </div>
            </Tabs.Item>
          </Tabs.Group>
          )
        }

      </div>
    </div>
  )
}
