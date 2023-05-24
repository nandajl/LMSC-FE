import React, { useState } from 'react'

export default function Content() {
  
  

  return (
    <div className=''>
      <p className='font-bold text-3xl mb-6'>Grup anda</p>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              No
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
              1
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
              Jone Doe  
            </td>
            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
              <a href="" className='border border-secondary text-secondary rounded-full py-1 px-3 '>Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
