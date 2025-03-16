import React from 'react';
import { IoIosArrowDown } from "react-icons/io";

const InputArrow = ({ placeholder, value,like, onChange, name }) => {
  const shape=like?"absolute top-[40%] left-100 w-[18px] h-[24px] transition  group-focus-within:rotate-90":"absolute top-[40%] right-4 w-[18px] h-[24px] transition  group-focus-within:rotate-90"
  return (
    <div className="relative group">
      <input
        className="w-[450px] h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10"
        value={value}  
        onChange={onChange}  
        placeholder={placeholder}
        name={name}  
      />
      <IoIosArrowDown className={shape} />
    </div>
  );
};

export default InputArrow;
