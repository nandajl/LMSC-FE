import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'flowbite-react'
import * as Dialog from '@radix-ui/react-dialog';
import { AiOutlinePlusSquare, AiOutlineCloseCircle } from 'react-icons/ai';
import FormEssai from './FormEssai';
import FormPilihanGanda from './FormPilihanGanda';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ModalSoal = (props) => {

  const [option, setOption] = useState("essai");
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const sendData = (data) => {
    setData(data)
  } 

  async function handleSubmit() {
    try {
      data.question.test_id = props.testId
      console.log(data);
      const response = await axios.post(`http://localhost:8000/api/v1/question`, {
        question: data.question,
        answer: data.answer
      })
      console.log(response);
      if (response) {
        window.location.reload(false);  
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button>
            <AiOutlinePlusSquare className='text-5xl' />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black bg-opacity-40 fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-fadeIn fixed top-1/2 left-1/2 max-h-full w-2/4 max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
            <Dialog.Title className="text-xl font-medium pb-3 mb-6 border-b-2 border-slate-300">
              Tambah Soal
            </Dialog.Title>
            <div className='flex gap-5'>
              <div className='w-full'>
                <FormPilihanGanda sendData={sendData}/>
                {/* {
                  option === "essai" ? (
                    <FormEssai setData={setData}/>
                    ): (
                      <FormPilihanGanda sendData={sendData}/>
                  )
                } */}
              </div>
              {/* <div className='w-2/6'>
                <select onChange={(e) => setOption(e.target.value)} name="modelSoal" id="modelSoal" className='rounded-lg w-full'>
                  <option value="essai">Essai</option>
                  <option value="pg">Pilihan Ganda</option>
                </select>
              </div> */}
            </div>
            <div className="mt-6 flex justify-end">
              <Dialog.Close asChild>
                <button className="text-secondary border border-secondary hover:border-blue-950 hover:text-blue-950 me-2 focus:shadow-green7 inline-flex h-9 items-center justify-center rounded-md px-4 font-medium leading-none focus:outline-none">
                  Batal
                </button>
              </Dialog.Close>
              <button onClick={handleSubmit} className="text-gray-800 bg-primary hover:bg-green-200 hover:text-black focus:shadow-green7 inline-flex h-9 items-center justify-center rounded-md px-4 font-medium leading-none focus:outline-none">
                Simpan
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
