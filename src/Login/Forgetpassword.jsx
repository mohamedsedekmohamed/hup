import React, { useState } from 'react';
import Loginpic from '../assets/Loginpic.png'
import contanu from '../assets/contanu.svg'
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/back.svg'
const Forgetpassword = () => {
      const [input, Setinput] = useState('');
      const Navigate=useNavigate()
      const handleLogin = () => {
        if (input.length>11 ||input.includes('@gmail.com')) {
        Navigate('/Opt')
        }
      };
  return (
   <div className=' h-[957px] text-center  lg:w-[1440px] lg:flex  '>
          <div className=' pt-15  pl-15 flex flex-col  lg:flex-1 '>
          <div className='flex flex-col text-left  w-[328px] h-[400px]     lg:w-[450px] lg:h-[622px]  '>
          <span className='  flex gap-10' >
        <button onClick={() => Navigate('/')}>  <img className='w-[40px] h-[40px] text-2xl lg:text-5xl text-one font-medium' src={arrow}/>  </button>   
            <span className='w-[40px] h-[40px] text-2xl lg:text-5xl text-one font-medium'>Forgot<span className='mr-2'></span>Password?</span>
            </span> 
  <span className='text-[24px] lg:text-[40px] pt-5 lg:pt-10'>Forgot<span className='mr-2'></span>Password?  </span>
  <span className='text-[16px] text-eleven lg:text-[24px] mt-1'>Don't worry! that happens. Please register your
phone  or email to which we will send your One
Time Password (OTP)  </span>
  <input 
   type="text"
   value={input}
   onChange={(e) => Setinput(e.target.value)}
  className=' w-[328px] h-[56px]  lg:w-[450px] lg:h-[72px] border-one border-1 rounded-[8px] mt-2 lg:mt-5 pl-3' placeholder='email or phone'/>

  
  
  <button  onClick={handleLogin}>
      <img src={contanu}  className='w-[450px] h-[71px] mt-7 lg:mt-15'/>
  </button>
  
          </div>
          </div>
          <img className=' hidden lg:block w-[708px] h-fit flex-1 ' src={Loginpic}/>
  
      </div>
    );
}

export default Forgetpassword
