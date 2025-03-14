import React, { useState } from 'react';
import SignupButtonContainer from '../assets/SignupButtonContainer.svg'
import Loginpic from '../assets/Loginpic.png'
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
function LoginIn({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };
  const handleLogin = () => {
    if (username === '1' && password === '1') {
      setIsLoggedIn(true); 
    } else {
      alert('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className='w-screen h-screen grid  md:grid-cols-2 gap-2'>
    <div className='flex justify-between items-start  '>
       <div className='flex flex-col  mt-[5%] ml-[8%]  '>
       <span className=' text-2xl lg:text-5xl text-one font-medium'>Login</span> 
<span className='text-[24px] lg:text-[50px] pt-5 lg:pt-10'>Welcome back  </span>
<span className='text-[16px] lg:text-[24px] mt-1'>Log in to your account  </span>

<input 
 type="text"
 value={username}
 onChange={(e) => setUsername(e.target.value)}
// className=' w-[328px] h-[56px]  lg:w-[450px] lg:h-[72px] border-one border-1 rounded-[8px] mt-2 lg:mt-5 pl-3' placeholder='email'/>
className=' w-[80%] h-[56px]  lg:w-[450px] lg:h-[72px] border-one border-1 rounded-[8px] mt-2 lg:mt-5 pl-3' placeholder='email'/>
<div className='relative '>
<button
 type="button"
 onClick={togglePasswordVisibility} 
>
{/* 
   {showPassword===true&&(< FaRegEyeSlash className='absolute top-1/3 lg:top-1/2 right-3 lg:right-5 text-2xl'/>)} 
   {showPassword===false&&(<MdOutlineRemoveRedEye className='absolute top-1/3 lg:top-1/2 right-3 lg:right-5 text-2xl'/>)} 
   */}
   {showPassword===true&&(< FaRegEyeSlash className='absolute top-1/3 lg:top-1/2 right-[6%]  text-2xl'/>)} 
   {showPassword===false&&(<MdOutlineRemoveRedEye className='absolute top-1/3 lg:top-1/2 right-[6%] text-2xl'/>)} 
    </button> 
<input 
       type={showPassword ? 'text' : 'password'} 
value={password}
onChange={(e) => setPassword(e.target.value)}
className=' w-[80%] h-[56px]  lg:w-[450px] lg:h-[72px] border-one border-1 rounded-[8px]  mt-2 lg:mt-5 pl-3 ' placeholder='password'/>
</div>



<button onClick={handleLogin}>

    <img  src={SignupButtonContainer} className='mt-5 w-[90%] '/>
</button>
 


     </div>
    </div>

    <div className='hidden md:flex  '>
      <img src={Loginpic} className='object-fill  w-full h-[690px]'/>
    </div>
  </div>
  
  );
}

export default LoginIn;
 
