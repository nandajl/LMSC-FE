import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DetailTestContent() {

  const { id } = useParams();
  const [test, setTest] = useState("")

  async function handleGetTest() {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/test/${id}`);
      setTest(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetTest();
  }, []);

  return (
    <div>DetailTestContent {id}</div>
  )
}
