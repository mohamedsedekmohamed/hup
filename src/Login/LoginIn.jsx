import React, { useState } from 'react';
import SignupButtonContainer from '../assets/SignupButtonContainer.svg';
import Loginpic from '../assets/Loginpic.png';
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from 'axios';

function LoginIn({ setIsLoggedIn }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

    const handleLogin = () => {
    setLoading(true);
    // localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    axios
      .post('https://bcknd.ticket-hub.net/api/login', { 
        email: username, 
        password: password
      })
      .then((response) => {
        setData(response.data);
        if (response.data.message === "Login Successfully") {
          localStorage.setItem('token', response.data.token);
          setIsLoggedIn(true);
        } else {
          alert('بيانات الدخول غير صحيحة');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        alert('حدث خطأ أثناء محاولة تسجيل الدخول');
      });
  };


  return (
    <div className='w-screen h-screen grid md:grid-cols-2 gap-2'>
      <div className='flex justify-between items-start'>
        <div className='flex flex-col mt-[5%] ml-[8%]'>
          <span className='text-2xl lg:text-5xl text-one font-medium'>Login</span> 
          <span className='text-[24px] lg:text-[50px] pt-5 lg:pt-10'>Welcome back</span>
          <span className='text-[16px] lg:text-[24px] mt-1'>Log in to your account</span>

          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-[80%] h-[56px]  lg:h-[72px] border-one border-1 rounded-[8px] mt-2 lg:mt-5 pl-3'
            placeholder='email'
          />

          <div className='relative'>
            <button
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword === true && (<FaRegEyeSlash className='absolute top-1/3 lg:top-1/2         right-25   sm:right-30  md:right-30      lg:right-25    text-2xl' />)}
              {showPassword === false && (<MdOutlineRemoveRedEye className='absolute top-1/3 lg:top-1/2  right-25  sm:right-30   md:right-30   lg:right-25 text-2xl' />)}
            </button>
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-[80%] h-[56px]  lg:h-[72px] border-one border-1 rounded-[8px] mt-2 lg:mt-5 pl-3'
              placeholder='password'
            />
          </div>

          <button onClick={handleLogin}>
            <img src={SignupButtonContainer} className='mt-5 w-[90%]' />
          </button>
        </div>
      </div>

      <div className='hidden md:flex'>
        <img src={Loginpic} className='object-fill w-full h-screen max-h-[800px]' />
      </div>
    </div>
  );
}

export default LoginIn;
