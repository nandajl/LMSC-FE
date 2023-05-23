import React, { useEffect, useState } from 'react'
import { AiOutlinePlusSquare, AiOutlineDelete } from 'react-icons/ai';

export default function FormPilihanGanda(props) {

  const [inputJawaban, setInputJawaban] = useState([{jawaban:""}])
  const [question, setQuestion] = useState("")

  const addInputField = () => {
    setInputJawaban([...inputJawaban, {jawaban:""}])
  }

  const removeInputField = (index) => {
    const newFormValue = [...inputJawaban];
    newFormValue.splice(index, 1);
    setInputJawaban(newFormValue);
  }

  const handleChange = (e, index) => {
    let newFormValues = [...inputJawaban]
    newFormValues[index][e.target.name] = e.target.value
    setInputJawaban(newFormValues)
  }
  const sendDataToParent = () => {
    const data = {
      question: {
        question_text: question
      },
      answer: inputJawaban,
    };
    props.sendData(data);
  };
  
  useEffect(() => {
    sendDataToParent();
  }, [question, inputJawaban]);


  return (
    <>
      <fieldset className="mb-4 flex items-center gap-5">
        <textarea
          className="border-none bg-slate-100 w-full"
          id="name"
          placeholder='Soal'
          value={question || ""}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </fieldset>
      <fieldset className="mb-4 flex gap-5">
        <label className="text-violet11 w-20 text-right text-base" htmlFor="username">
          Jawaban
        </label>
        <div className='w-full'>
        {
          inputJawaban.map((element, index) => {
            return(
              <div className='flex mb-2 gap-1' key={index}>
                <input
                  className="border border-gray-500 inline-flex h-9 w-full flex-1 items-center justify-center rounded-sm px-2 text-base leading-none outline-none"
                  id="username"
                  placeholder='Jawaban'
                  value={element.jawaban || ""}
                  name='jawaban'
                  onChange={(e) => handleChange(e, index)}
                />
                <button onClick={() => removeInputField(index)}><AiOutlineDelete className='text-4xl p-1 text-error border border-error' /></button>
              </div>
              )
            })
          }
        </div>
      </fieldset>
        <button onClick={addInputField} className='float-right'><AiOutlinePlusSquare className='text-4xl' /></button>
    </>
  )
}
