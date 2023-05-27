import React, { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { AiOutlinePlusSquare, AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { useUsers } from "../store";

export default function ModalFeedback() {

  const user = useUsers((state) => state.user);

  const [feedbackCat, setFeedbackCat] = useState([]);
  const [nilai, setNilai] = useState("");
  const [pesan, setPesan] = useState("");
  const [feedbackCatValue, setFeedbackCatValue] = useState("")

  const handleSubmit = async() => {
    if (nilai == "") {
      alert("Nilai tidak boleh kosong");
    }
    else {
      try {
        const data = {
          user_id: user.id,
          feedbackCat_id: feedbackCatValue,
          nilai: nilai,
          message: pesan
        }
        console.log(data);
        const response = await axios.post(`http://localhost:8000/api/v1/feedback/`,data);
        window.location.reload(true);
      } catch (error) {
        console.log(error);
      }  
    }
  }

  const handleGetFeedbackCat = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/feedback/category`);
      setFeedbackCat(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetFeedbackCat();
  }, [])

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
              <select onChange={(e) => setFeedbackCatValue(e.target.value)} name="subject" id="subject" className='border-none bg-slate-100 w-full rounded-md'>
                <option value="" hidden>Pilih Kategori</option>
                {feedbackCat.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-5 mb-5'>
              <label htmlFor="nilai">Nilai</label>
              <div className='flex justify-center gap-8 text-3xl'>
                <button value="1" onClick={(e) => setNilai(e.target.value)} className='opacity-50 hover:opacity-100 hover:scale-125 focus:opacity-100'>😔</button>
                <button value="2" onClick={(e) => setNilai(e.target.value)} className='opacity-50 hover:opacity-100 hover:scale-125 focus:opacity-100'>☹</button>
                <button value="3" onClick={(e) => setNilai(e.target.value)} className='opacity-50 hover:opacity-100 hover:scale-125 focus:opacity-100'>🙂</button>
                <button value="4" onClick={(e) => setNilai(e.target.value)} className='opacity-50 hover:opacity-100 hover:scale-125 focus:opacity-100'>😄</button>
                <button value="5" onClick={(e) => setNilai(e.target.value)} className='opacity-50 hover:opacity-100 hover:scale-125 focus:opacity-100'>😍</button>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <label htmlFor="subject">Pesan</label>
              <textarea
                className="border-none bg-slate-100 w-full rounded-md"
                id="name"
                placeholder='Pesan'
                onChange={(e) => setPesan(e.target.value)}
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
