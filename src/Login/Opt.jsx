import React, { useState } from 'react'
import submit from '../assets/submit.svg';
import Loginpic from '../assets/Loginpic.png'
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/back.svg'

const Opt = () => {
  const Navigate=useNavigate()
  const [values, setValues] = useState(['', '', '', '']);

  // دالة للتعامل مع التغيير في أي خانة
  const handleInputChange = (e, index) => {
    const newValue = e.target.value;

    // التحقق من أن المدخل هو رقم واحد فقط
    if (/^[0-9]$/.test(newValue)) {
      // تحديث القيمة عند الرقم الذي تم إدخاله
      const newValues = [...values];
      newValues[index] = newValue;
      setValues(newValues);
    } else {
      // إذا كان المدخل غير صحيح (ليس رقمًا أو أكثر من رقم واحد)
      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);
    }
  };

  // دالة لتحديث كافة الحقول مع نفس القيمة
  
  
  return (
    <div className='w-screen h-screen grid grid-cols-2 gap-2'>
      <div className='flex  '>
         <div className='flex flex-col  mt-[5%] ml-[8%]  '>

                     <span className='  flex gap-10 justify-center  ' >
                  
                    <button onClick={() => Navigate('/Forgetpassword')}>  <img className='w-[40px] h-[40px] text-2xl lg:text-5xl text-one font-medium' src={arrow}/>  </button>   
                        <span className='text-[24px] lg:text-[40px] pt-5 '>OTP<span className='mr-2'></span>Verification?</span>

                        </span> 
                        <span className='text-[24px] pt-5 lg:pt-10'>Enter the OTP sent to -<span className='mr-2 text-three   '>+91-8976500001  </span> </span>
       
      <div className='grid grid-cols-4 gap-2 mt-5 '> 
      {values.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          maxLength={1}
          onChange={(e) => handleInputChange(e, index)}
          className="w-[71px] h-[71px] border-1 border-one rounded-[8px] text-center"
          placeholder="0"
        />
      ))}
  

      </div>
      <span className='text-center mt-5'>00:30:0</span>
      <span className='text-xl pt-5 lg:pt-10'>Don’t receive code ? Re-send<span className='mr-2 text-three   '> Re-send </span> </span>
      <button onClick={()=>Navigate('/Newpassword')}><img src={submit} className='mt-5 w-[90%] '/></button>

       </div>
      </div>

      <div className='flex  '>
    <img src={Loginpic} className='object-fill w-full h-[690px]'/> 
      </div>
    </div>
  )
}

export default Opt
