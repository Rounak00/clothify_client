import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import registerImg from "../assets/register.webp"

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName]=useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='flex'>
            <div className='w-full md:w-1/2  flex flex-col justify-center items-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-medium'>Clothify</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>Welcome</h2>
                    <p className='text-center mb-6'>
                        Enter your username and password to login
                    </p>
                    <div className='mb-4'>
                        <label className="block text-sm font-semibold mb-2">Name</label>
                        <input placeholder="Enter your name" type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full p-2 border rounded' />
                    </div>
                    <div className='mb-4'>
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input placeholder="Enter your email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-2 border rounded' />
                    </div>
                   
                    <div className='mb-4'>
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-2 border rounded' />
                    </div>
                    <button type='submit' className='w-full bg-black text-white font-semibold rounded-lg p-2 hover:bg-gray-800 transition'>Sign Up</button>
                    <p className='mt-6 text-center text-sm'>
                        Don't have an account ?
                        <Link to="/login" className='text-red-600'>
                            {" "}Login
                        </Link>
                    </p>
                </form>
            </div>
            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={registerImg} alt="Login to Account" className='h-[750px] w-full object-cover' />
                </div>
            </div>
        </div>)
}

export default Register