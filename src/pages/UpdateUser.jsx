import axios from 'axios';
import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';


export const UpdateUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company_code = params.get("company_code");

    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [nim, setNim] = useState("")
    const [phone, setPhone] = useState("");
    const [companyCode, setCompanyCode] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [alert, setAlert] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null)

    const handleImageChange = (event) => {
        const image = event.target.files[0];
    
        setSelectedImage(image);
    
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(image);
    };

    function getUserData() {
        const localToken = localStorage.getItem('token');
        axios.get("http://localhost:8000/api/v1/user", {
            headers: {
                Authorization: `Bearer ${localToken}`
            }
        }).then(res => {
            setId(res.data.data.id);
            setUsername(res.data.data.username);
            setNim(res.data.data.nim);
            setPhone(res.data.data.phone);
            setCompanyCode(res.data.data.company_code);
            setAddress(res.data.data.address);
            setPreviewImage(res.data.data.photo);
            setRole(res.data.data.role)
        }).catch(res => console.log(res));
    }

    useEffect(() => {
        getUserData();
    }, [])

    async function handleUpdateUser(e) {
        e.preventDefault();

        const body = new FormData();
        body.append("username", username);
        body.append("nim", nim);
        body.append("phone", phone);
        body.append("address", address);
        if (role === "Perusahaan") {
            body.append("company_code", company_code);
        }else{
            body.append("company_code", companyCode);
        }
        body.append("photo", selectedImage);

        console.log(body);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        await axios.put(`http://localhost:8000/api/v1/users/${id}`, body, config).then(res => {
            if (role === "Perusahaan") {
                navigate('/dashboard/company');
            }else {
                navigate('/');
            }
        }).catch(error => {
            console.log(error);
            const dataError = error.response.data.message;
            setError(dataError);
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000)
        });
    }

    return (
        <div className='flex'>
            {
                alert ? (
                <div className='static'>
                    <div className='absolute border py-3 px-4 rounded-full bg-error text-white font-bold top-24 right-0 text-xs lg:right-40 lg:top-7'>
                        {error}
                        <button onClick={e => setAlert(false)} className='px-1 ms-2'>&#x2715;</button>
                    </div>
                </div>

                ):
                <></>
            }
            <form onSubmit={handleUpdateUser} className='w-3/4 border border-secondary rounded-3xl lg:rounded-large py-8 lg:py-14 px-7 lg:px-20 my-20 mx-auto overflow-auto no-scrollbar'>
                <p className='text-secondary font-bold text-lg'>Data User</p>
                <div className='flex'>
                    <div className='flex flex-col mt-5 w-4/6'>
                        <label htmlFor="username">Username</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} type="text" className='text-gray-500 border mb-3 border-secondary rounded-full px-4 py-1 mt-2 ' required disabled />
                        {
                            nim && (
                                <>
                                    <label htmlFor="username">NIM</label>
                                    <input value={nim} onChange={e => setNim(e.target.value)} type="text" className='text-gray-500 border border-secondary rounded-full px-4 py-1 mt-2 ' required disabled />
                                </>
                            )
                        }
                    </div>
                    <div className='px-5 text-center'>
                        <label htmlFor="image">User Image</label>
                        <img src={previewImage}  className={`${selectedImage ? "w-32 h-32 border rounded-full align-middle mx-auto mb-3" : "w-32 h-32 border border-secondary rounded-full align-middle mx-auto mb-3"}`}/>
                        <input type="file" accept='image/*' onChange={handleImageChange} className='border rounded-full'/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label >Nomor Telepon</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} type="text" className='border border-secondary rounded-full px-4 py-1 mt-2 ' required />
                </div>
                <div className='flex flex-col mt-5'>
                    <label>Alamat</label>
                    <textarea value={address} onChange={e => setAddress(e.target.value)} type="text" className='border border-secondary rounded-3xl px-4 py-3 mt-2 h-32' required />
                </div>
                <div className='flex justify-between'>
                    <Link to='/'>
                        <button className='border border-secondary rounded-full p-2 float-right text-secondary text-sm font-bold w-40 mt-5 hover:outline hover:outline-secondary'>Batal</button>
                    </Link>
                    <button className='bg-secondary rounded-full p-2 float-right text-white text-sm font-bold w-40 mt-5 hover:bg-blue-900'>Submit</button>
                </div>
            </form>
        </div>
    )
}
