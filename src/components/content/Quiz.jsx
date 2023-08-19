import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Alert from '../Alert';
import { useUsers } from "../../store";
import { CountDown } from "../CountDown";

export const Quiz = () => {
  const user = useUsers((state) => state.user);
  const { state } = useLocation();

  const navigate = useNavigate();

  const { id } = useParams();

  const [question, setQuestion] = useState([])
  const [page, setPage] = useState(0)
  const [inputAnswer, setInputAnswer] = useState([])
  const [answerText, setAnswerText] = useState({})


  async function handleGetQuestion() {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/question/test/${id}`);
      setQuestion(response.data);
      console.log(question);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  

  const handleAnswerChange = (e) => {
    const { name, value } = e.target;

    const newAnswer = {
      question_id: question[page].id,
      selected_answer_id: JSON.parse(value).id
    };
    console.log(newAnswer);
    const answerIndex = inputAnswer.findIndex((answer) => answer.question_id === question[page].id);
    if (answerIndex === -1) {
      setInputAnswer((prevState) => [...prevState, newAnswer]);
    } else {
      setInputAnswer((prevState) => {
        const newState = [...prevState];
        newState[answerIndex] = newAnswer;
        return newState;
      });
    }
  }

  function addDataToAnswers(answers, data) {
    const updatedAnswers = answers.map((answer) => {
      return {
        ...answer,
        ...data,
      };
    });
  
    return updatedAnswers;
  }
  
  const handleTimeExpired = () => {
    alert('Time Expired');
    handleSubmit();
    navigate('/dashboard/matkul/');
  }

  const handleSubmit = async () => {
    try {
      const dataTambah = {
        user_id: user.id,
        test_id: id,
      }
      const data = addDataToAnswers(inputAnswer, dataTambah);
      const response = await axios.post(`http://localhost:8000/api/v1/user/answer`, data);
      console.log(response);
      navigate('/dashboard/test/detail/' + id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetQuestion();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='w-3/4 border border-secondary rounded-3xl lg:rounded-large py-8 lg:py-14 px-7 lg:px-20 my-40 mx-auto overflow-auto no-scrollbar'>
        <div className='flex justify-between'>
          <h1 className='text-3xl font-bold mb-5'>Quiz</h1>
          <CountDown duration={state} onTimeExpired={handleTimeExpired}/>
        </div>
        <div className='flex justify-between'>
          <div className='w-8/12'>
            {
              question.length > 0 ? (
                <div className=''>
                  <p className='text-lg font-medium mb-5 ms-5'>{page + 1}. {question[page].question_text}</p>
                  {
                    question[page].Answers ? (
                      question[page].Answers.map((item, index) => (
                        <div key={index} className='flex items-center ms-14 gap-2'>
                          <input 
                            type="radio" 
                            name={item.question_id} 
                            value={JSON.stringify(item)} 
                            onChange={(e) => handleAnswerChange(e)}
                            checked={inputAnswer.some(answer => answer.question_id === question[page].id && answer.selected_answer_id === item.id)}
                          />
                          <label >{item.answer_text}</label>
                        </div>
                      ))
                    ):(
                      <textarea
                        type="text"
                        className='ms-14 w-full'
                        name={question[page].id}
                        value={answerText[question[page].id] || ''}
                        onChange={(e) => handleAnswerChange(e)}
                        placeholder='Answer'
                      />
                     )
                  } 
                </div>
              ) : (
                <p>Loading...</p>
              )
            }
          </div>
          <div className='w-2/12'>
            <p className='text-lg font-medium'>Soal</p>
            <div className='flex flex-nowrap gap-1'>
              {
                question.length > 0 ? (
                  question.map((item, index) => (
                    <div>
                      <button key={index} onClick={(e) => setPage(() => e.target.innerHTML - 1)} className={`${page === index ? 'bg-blue-500 text-white' : 'bg-slate-100'} px-4 py-2 rounded-xl hover:outline hover:outline-1 hover:outline-secondary`}>{index + 1}</button>
                    </div>
                  ))
                ) : <></>
              }
            </div>
          </div>
        </div>
        <div className='mt-40 flex justify-center gap-3'>
          <button
            disabled={page === 0}
            className='px-4 py-2 bg-blue-500 text-white font-medium rounded-xl disabled:bg-slate-400 hover:bg-blue-700'
            onClick={() => handlePageChange(page - 1)}
          >
            &lt; Prev
          </button>
          {
            page !== question.length - 1 ? (
              <button
                className='px-4 py-2 bg-blue-500 text-white font-medium rounded-xl disabled:bg-slate-400 hover:bg-blue-700'
                onClick={() => {
                  if (page === question.length - 1) {
                    handleSubmit()
                  } else {
                    handlePageChange(page + 1)
                  }
                }}
              >
                {page === question.length - 1 ? 'Finish' : <span dangerouslySetInnerHTML={{ __html: 'Next &gt;' }} />}
              </button>
            ) : (
              <Alert type={'endExam'} onClick={handleSubmit} />
            )
          }
        </div>
      </div>
    </div>
  )
}
