import React, { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import axios from 'axios';
import { useUsers } from "../store";

export default function Alert(props) {
  const { type, submit, onClick } = props;

  const getUser = useUsers((state) => state.getUser);

  const [user, setUser] = useState("")
  const handleGetUser = async () => {
    const response = await getUser();
    setUser(response);
  }
  const handleUnrollGrup = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/users/${user.id}`, {
        group_id: null
      });
      if (response) {
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    onClick();
  }
  
  useEffect(() => {
    handleGetUser();
    console.log(type);
  }, [])

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button type={type} className={`${type === 'endExam' ? 'bg-amber-400' : 'bg-error'}  hover:bg-opacity-50 font-medium text-white px-4 py-2 rounded-lg`}>
          {
            type === 'endExam' ? 'End Exam' : 'Unroll Grup'
          }
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black opacity-50 fixed inset-0" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 max-h-96 w-1/3 translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 shadow-lg focus:outline-none">
          <AlertDialog.Title className="text-mauve12 m-0 text-lg font-medium">
            Apakah Kamu Yakin?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            {
              type === 'endExam' ? 'Dengan ini kamu akan mengakhiri ujian ini' : 'Dengan ini kamu akan mengunroll grup ini.'
            }
          </AlertDialog.Description>
          <div className="flex justify-end gap-5">
            <AlertDialog.Cancel asChild>
              <button className="text-gray-800 bg-gray-100 hover:bg-gray-300 focus:shadow-gray-700 inline-flex h-9 items-center justify-center rounded-md px-4 font-medium leading-none outline-none">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button 
                onClick={() => {
                    type === 'endExam' ? handleClick()  : handleUnrollGrup();
                  }
                } 
                className="text-red-600 bg-red-100 hover:bg-red-300 focus:shadow-red-600 inline-flex h-9 items-center justify-center rounded-md px-4 font-medium leading-none outline-none ">
                {
                  type === 'endExam' ? 'Ya, Akhiri Ujian' : 'Yes, Unroll Grup'
                }
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );

}