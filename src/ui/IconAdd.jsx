import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

const IconAdd = ({nav}) => {
      const navigate = useNavigate();
    
  return (
     <button      onClick={() => navigate(nav)} className=' flex justify-center items-center bg-three py-1 px-2 rounded-[8px] gap-1 '>
        <FaPlus  className='text-white'/>
    <span className='text-[20px] font-medium text-white '>Add</span>
        </button>
  )
}

export default IconAdd
