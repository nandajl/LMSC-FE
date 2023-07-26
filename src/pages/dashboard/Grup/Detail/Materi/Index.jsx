import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from "react-router-dom";
import { REACT_APP_DEV_MODE } from "../../../../../utils/url";
import axios from 'axios';
import { Tabs } from "flowbite-react";
import Card from "../../../../../components/Card";
import { AiOutlineEdit, AiOutlinePlusCircle } from 'react-icons/ai';
import { useUsers } from "../../../../../store";
import ReactHtmlParser from 'react-html-parser';

export const DetailMateri = () => {
  const getUser = useUsers((state) => state.getUser)

  const [user, setUser] = useState("");
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [lessons, setLessons] = useState([]);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetLesson = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${REACT_APP_DEV_MODE}/lessons/${id}`);
      console.log(response.data.data);
      setLessons(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetCourse();
    handleGetUser();
    handleGetLesson();
  }, []);

  return (
    <div className='font-inter'>
      <div className='flex justify-between'>
        <p className='text-3xl font-bold capitalize'>{lessons.title}</p>
      </div>
      <hr className='my-3' />
      <div className=''>
        {
          loading ? (
            <></>
          ):(
            <div className='bg-white p-10 rounded-3xl'>
              {ReactHtmlParser(lessons.body)}

            </div>
          )
        }

      </div>
    </div>
  )
}
