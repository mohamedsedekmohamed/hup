import React from 'react'
import IconAdd from '../ui/IconAdd'
import filter from '../assets/filter.svg'
import { CiSearch } from "react-icons/ci";
const TheeThing = ({navGo,like,liked,setOneValue,cheose,onevalue}) => {
  return (
    <div>
      <div className='w-full h-[48px]  mt-5 px-10 lg:px-[26px] justify-between gap-16 flex'>
       {!liked&&(<div className='flex justify-center items-center gap-3 relative'> 
          <input  placeholder='Search' className=' w-full  h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10'/>
          <CiSearch  className='w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6'/>
              </div>)}
          
          <div className='flex justify-center items-center gap-4'> 
         <button className=' flex justify-center items-center bg-one py-1 px-2 rounded-[8px] gap-1'>
      <img src={filter} className='w-4 h-4 px-1 md:w-6 md:h-6 '/>
      <span className='text-[16px] md:text-[20px] font-medium text-white '>Filter</span>
         </button>
      {!like&&(<IconAdd nav={navGo}/>)}  
        </div>  
        </div>
    </div>
  )
}

export default TheeThing
