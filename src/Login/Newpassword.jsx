import React, { useState } from 'react'
import submit from '../assets/submit.svg';
import Loginpic from '../assets/Loginpic.png'
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/back.svg'
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Newpassword = () => {
     const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false); 
      const [showPasswordtwo, setShowPasswordtwo] = useState(true); 
    const Navigate=useNavigate()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); 
      };
    const togglePasswordVisibilitytow = () => {
        setShowPasswordtwo(!showPasswordtwo); 
      };
  return (
    <div className='w-screen h-screen grid grid-cols-2 gap-2'>
      <div className='flex  '>
         <div className='flex flex-col  mt-[5%] ml-[8%]  '>
             <span className='  flex gap-10' >
                    <button onClick={() => Navigate('/Opt')}>  <img className='w-[40px] h-[40px] text-2xl lg:text-5xl text-one font-medium' src={arrow}/>  </button>   
                        <span className='w-[40px] h-[40px] text-2xl lg:text-5xl text-one font-medium'>OTP<span className='mr-2'></span>Verification?</span>
                        </span> 
                        <span className='text-[40px] font-medium pt-5 lg:pt-20'>New<span>password  </span> </span>
                        <span className='text-[32px] font-normal pt-5 '>   Create a new password                        </span>
     <div className='relative'>
     <button
      type="button"
      onClick={togglePasswordVisibility}
     >
        {showPassword===true&&(< FaRegEyeSlash className='absolute top-1/3 lg:top-1/2 right-3 lg:right-5 text-2xl'/>)} 
        {showPassword===false&&(<MdOutlineRemoveRedEye className='absolute top-1/3 lg:top-1/2 right-3 lg:right-5 text-2xl'/>)} 
         </button> 
     <input 
            type={showPassword ? 'text' : 'password'} 
     value={username}
     onChange={(e) => setUsername(e.target.value)}
     className=' w-[80%] h-[56px]  lg:w-[450px] lg:h-[72px] border-one border-1 rounded-[8px]  mt-2 lg:mt-5 pl-3 ' placeholder='password'/>
        </div>
        

     <div className='relative'>
     <button
      type="button"
      onClick={togglePasswordVisibilitytow} 
     >
        {showPasswordtwo===false&&(< FaRegEyeSlash className='absolute top-1/3 lg:top-1/2 right-3 lg:right-5 text-2xl'/>)} 
        {showPasswordtwo===true&&(<MdOutlineRemoveRedEye className='absolute top-1/3 lg:top-1/2 right-3 lg:right-5 text-2xl'/>)} 
         </button> 
     <input 
            type={showPasswordtwo ? 'password' : 'passwordtext'} 
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     className=' w-[80%] h-[56px]  lg:w-[450px] lg:h-[72px] border-one border-1 rounded-[8px]  mt-2 lg:mt-5 pl-3 ' placeholder='Confirm password'/>
        </div>
        

      <img src={submit} className='mt-5 w-[90%] '/>

       </div>
      </div>

      <div className='flex  '>
        <img src={Loginpic} className='object-fill w-full h-[690px]'/>
      </div>
    </div>
  )
}

export default Newpassword
