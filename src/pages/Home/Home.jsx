import React from 'react'
import rang from '../../assets/rang.svg';
import rrr from '../../assets/rrr.svg';

const Home = ({setIsLoggedIn}) => {

  const Handle = () => {
    setIsLoggedIn(false);


  }
  return (
<div className='w-full h-[56px] hidden md:flex  mt-6 px-[26px] justify-between '>
   <div className='flex justify-center items-center gap-3'> 
   <img  className='bg-two rounded-full  w-[56px] h-[56px]  '/>
   <span className='font-medium text-[24px]'> name </span>
   </div>
   <div className='flex justify-center items-center gap-3'> 
   <img  src={rang} onClick={Handle}  />
   <img  src={rrr}  />
   </div>
</div>
  )
}
export default Home
