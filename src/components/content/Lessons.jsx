import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useUsers } from "../../store";


export const Lessons = () => {
  const getUser = useUsers((state) => state.getUser)

  const [user, setUser] = useState("")
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState([]);
  const { id } = useParams();

  async function handleGetUser(){
    const response = await getUser()
    setUser(response);
  }

  useEffect(() => {
    handleGetCourse();
    handleGetUser();
  }, []);

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

  return (
    <div>
      {
        loading ? (
          <p>Loading ...</p>
        ) : (
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
                    return <Link to={'/' + lesson.id} key={lesson.id}>
                      <Card key={lesson.id} lesson={lesson} />
                    </Link>
                  })
                ) : (
                  <p>Belum Ada Materi Pelajaran</p>
                )
              }
            </div>
          </>
        )
      }

    </div>
  )
}
