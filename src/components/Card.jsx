import React, { useEffect } from 'react'

export default function Card(props) {

  useEffect(() => {
  }, [])

  
  function makeExcerpt(text, maxLength) {
    if (text.length > maxLength) {
      const truncatedText = text.substring(0, maxLength - 3) + '...';
      return React.createElement('div', { dangerouslySetInnerHTML: { __html: truncatedText } });
    }
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: text } });
  }

  if (props.lesson) {
    return (
      <div className='w-48 h-48 rounded-lg shadow-lg border-2 border-opacity-5 p-4 hover:-translate-y-4 hover:duration-200'>
        <h1 className='font-bold text-xl capitalize mb-3'>{props.lesson.title}</h1>
        {makeExcerpt(props.lesson.body, 140)}
      </div>
    )
  }
  if (props.test) {
    return(
      <div className='w-48 h-48 rounded-lg shadow-lg p-4 border-2 border-opacity-5 hover:-translate-y-4 hover:duration-200 '>
        <h1 className='font-bold text-xl capitalize mb-3'>{props.test.title}</h1>
        <p>{props.test.description}</p>
      </div>
    ) 
  }
  else(
    <>
    </>
  )
}
