import React from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { AiOutlinePlusSquare, AiOutlineCloseCircle } from 'react-icons/ai';


export default function ModalFeedback() {

  const handleSubmit = () => {
    
  }

  return (
    <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'>Submit</button>  
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black bg-opacity-40 fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-fadeIn fixed top-1/2 left-1/2 max-h-full w-2/4 max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
            <Dialog.Title className="text-xl font-medium pb-3 mb-6 border-b-2 border-slate-300">
              Feedback
            </Dialog.Title>
            <div className='flex flex-col gap-3 mb-5'>
              <label htmlFor="subject">Kategori</label>
              <select name="subject" id="subject" className='border-none bg-slate-100 w-full rounded-md'>
                <option value="" hidden>Pilih Kategori</option>
              </select>
            </div>
            <div className='flex flex-col gap-3'>
              <label htmlFor="subject">Pesan</label>
              <textarea
                className="border-none bg-slate-100 w-full rounded-md"
                id="name"
                placeholder='Soal'
              />
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
  )
}
