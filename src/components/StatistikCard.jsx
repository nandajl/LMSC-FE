import React from 'react'

export const StatistikCard = (props) => {
  const { children } = props;
  return (
    <div className='w-72 min-h-52 rounded-lg shadow-lg p-4 bg-blue-200'>
      {children}
    </div>
  )
}
