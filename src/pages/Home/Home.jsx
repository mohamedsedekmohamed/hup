import React, { useEffect, useState } from 'react';
import rang from '../../assets/rang.svg';
import rrr from '../../assets/rrr.svg';
import { FiAlignJustify } from "react-icons/fi";
import { useLocation } from 'react-router-dom';

const Home = ({ setIsLoggedIn, open, setopen }) => {
  const location = useLocation();
  const [name, setName] = useState("");

  const Handle = () => {
    setIsLoggedIn(false);
  }

  const handleopen = () => {
    setopen(!open);
  }

  function removeSlash(inputString) {
    // استبدال كل "/" بمسافة
    return inputString.replace(/\//g, ' ');
  }

  useEffect(() => {
    const updatedName = removeSlash(location.pathname);  // استبدال الـ "/" بالمسافات
    setName(updatedName);  // تحديث الحالة
  }, [location.pathname]);

  return (
    <div>
      <div className='w-full h-[56px] hidden md:flex mt-6 px-[26px] justify-between'>
        <div className='flex justify-center items-center gap-3'>
          <img className='bg-two rounded-full w-[56px] h-[56px]' />
          <span className='font-medium text-[24px]'>name</span>
        </div>
        <div className='flex justify-center items-center gap-3'>
          <img src={rang} onClick={Handle} />
          <img src={rrr} />
        </div>
      </div>

      <div className='flex items-center md:hidden'>
        <button className='w-15 h-15 pl-10' onClick={handleopen}>
          <FiAlignJustify />
        </button>
        <span className='w-full text-center lg:hidden  font-bold text-[20px]'>{name}</span>
      </div>
    </div>
  );
}

export default Home;
