import React from 'react'
import { Accordion } from 'flowbite-react'

export default function Faq() {
    return (
        <div className='lg:flex px-16 lg:px-44 my-28 justify-between'>
            <div>
                <p className='text-4xl font-bold mb-10'>Frequently Asked Question</p>
                <p>Bebrapa jawaban yang mungkin sedang kamu cari</p>
            </div>
            <div className='mt-6 lg:mt-0 lg:w-1/2 '>
                <Accordion className='rounded-none'>
                    <Accordion.Panel> 
                        <Accordion.Title className='text-black'>
                            Apa itu LMS?
                        </Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-black dark:text-gray-400">
                                LMS (Learning Management System) adalah sebuah aplikasi berbais web yang dibuat untuk memudahkan proses pembelajaran di sebuah perusahaan
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title className='text-black'>
                            Kenapa memilih LMS?
                        </Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-black dark:text-gray-400">
                            LMSC menyediakan system pembelajaran terpusat secara online. Dengan aplikasi ini pegawai baru atau anak magang di perusahaan bisa mempelajari skill dan kebutuhan-kebutuhan pekerjaan.    
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title className='text-black'>
                            Bagaimana cara menjalin kerjasama dengan kami?
                        </Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-black dark:text-gray-400">
                                Kalian bisa mengirimkan pesan dan ajakan kerjasama kepada kami di nomor dan beberpa sosial di bawah ini    
                            </p>
                            <ul className="list-disc pl-5 text-black dark:text-gray-400">
                                <li>
                                    <a
                                        href="https://flowbite.com/pro/"
                                        className="text-green-600 hover:underline dark:text-blue-500"
                                    >
                                        Whatsapp
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://tailwindui.com/"
                                        rel="nofollow"
                                        className="text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Email
                                    </a>
                                </li>
                            </ul>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>
    )
}
