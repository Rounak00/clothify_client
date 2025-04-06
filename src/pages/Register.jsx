import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import registerImg from "../assets/register.webp"
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { mergeCart } from '../redux/slices/cartSlice';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const {user,guestId,loading}=useSelector((state)=>state.auth);
    const {cart}=useSelector((state)=>state.cart);

    const redirect=new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect=redirect.includes("checkout") ;
    useEffect(()=>{
        
        if(user){
            if(cart?.products?.length>0 && guestId){
              dispatch(mergeCart({guestId,user}))
              .then(()=>{
                navigate(isCheckoutRedirect?"/checkout":"/");
              });
            }else{
                navigate(isCheckoutRedirect?"/checkout":"/");
            }
        }
    },[user,guestId,cart,navigate,dispatch,isCheckoutRedirect]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ email, password, name })).then((res) => {
            if (res.error) {
                toast.error(res.payload.message);
            } else {
                toast.success("Registration Successful");
            }
        })
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
                    <button type='submit' className='w-full bg-black text-white font-semibold rounded-lg p-2 hover:bg-gray-800 transition'>
                        {loading ? "Signing Up":"Sign Up"}
                    </button>
                    <p className='mt-6 text-center text-sm'>
                        Don't have an account ?
                        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-red-600'>
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