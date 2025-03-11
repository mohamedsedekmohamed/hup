import React from 'react'
import IconAdd from '../ui/IconAdd'
import filter from '../assets/filter.svg'
import { CiSearch } from "react-icons/ci";
const TheeThing = ({navGo}) => {
  return (
    <div>
      <div className='w-[1098px] h-[48px]  mt-10 px-[26px] justify-between flex'>
          <div className='flex justify-center items-center gap-3 relative'> 
          <input placeholder='Search' className='w-[350px] h-[48px] border-2 border-two rounded-[8px] pl-10'/>
          <CiSearch  className='w-6 text-black font-medium absolute left-2 h-6'/>
              </div>
          <div className='flex justify-center items-center gap-4'> 
         <button className=' flex justify-center items-center bg-one py-1 px-2 rounded-[8px] gap-1'>
      <img src={filter} className='w-6 h-6'/>
      <span className='text-[20px] font-medium text-white '>Filter</span>
         </button>
        <IconAdd nav={navGo}/>
        </div>
        </div>
    </div>
  )
}

export default TheeThing
