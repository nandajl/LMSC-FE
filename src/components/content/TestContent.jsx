import React, { useEffect, useState } from 'react'
import Card from '../Card'
import axios from 'axios';
import { useUsers } from '../../store'
import { Link } from 'react-router-dom';

export default function TestContent() {
  const getUser = useUsers((state) => state.getUser)

  const [test, setTest] = useState([])
  const [user, setUser] = useState("")

  async function handleGetTest(){
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/test/find`, {
        group_id: user.group_id
      });
      setTest(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetUser() {
    const response = await getUser()
    setUser(response);
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    if (user && user.group_id) {
      handleGetTest();
    }
  }, [user])

  return (
    <div className=''>
      <p className='font-bold text-3xl mb-6'>Test</p>
      <div className='flex gap-5 flex-wrap'>
        {
          test.length > 0 ? (
            test.map((test) => (
              <Link to={'/content/test/detail/' + test.id} key={test.id}>
                <Card test={test} />
              </Link>
            ))
          ): <p>Belum ada Test</p>
        }
      </div>
    </div>
  )
}
