import React, { useEffect, useState } from 'react'

export default function FormEssai(props) {

  const [question, setQuestion] = useState(null)

  const handleChange = async (e) => {
    setQuestion({
      question:{
        'question_text': e.target.value}
      })
  }

  useEffect(() => {
    if (question !== null) {
      props.setData(question);
    }
  }, [question]);

  return (
    <>
      <fieldset className="mb-4 flex items-center gap-5">
        <textarea
          className="border-none bg-slate-100 w-full"
          id="name"
          placeholder='Soal'
          onChange={handleChange}
        />
      </fieldset>
    </>
  )
}
