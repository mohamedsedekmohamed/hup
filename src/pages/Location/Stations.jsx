import React, { useState } from 'react'
import ThreeThing from '../../component/ThreeThing';
import NavLocation from './NavLocation';
import delet from  '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Tiglebutton from '../../ui/Tiglebutton';
const Stations = () => {
  const data = [
    {  Name: 'Downtone', Zone: 'Cairo', City:"Egypt",Country:"Active",Location:"location", Action:"" },
   ];
   const [action, setAction] = useState(() => {
    return localStorage.getItem('action') || 'on'; 
  });
   const handleToggle = (newAction) => {
     setAction(newAction);
     localStorage.setItem('action', newAction); 
    }
  
  return (
    <div>
          <NavLocation/>
<div className='flex ml-6 mt-6 gap-6'>
<Tiglebutton 
        action={action === 'on' ? 'on' : 'off'} 
        onClick={() => handleToggle('on')} 
        title='Pick-up'
      />
      <Tiglebutton 
        action={action === 'on' ? 'off' : 'on'} 
        onClick={() => handleToggle('off')} 
        title='Drop-off'

      />
</div>
{action==='on'?(<div>  <ThreeThing navGo='/Location/AddOnStation'/>
       <div className=" mt-10 ml-5">
            <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">Name</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Zone</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">City</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Country</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Location</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
                  <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
        <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Name}</td>
      
                  
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Zone}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.City}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Country}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Location}</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-5 items-center">
                      <img className='w-[24px] h-[24px]' src={pin}/>
                      <img  className='w-[24px] h-[24px]' src={delet}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></div>):
          (<div>  <ThreeThing navGo='/Location/AddOffStation'/>
       <div className=" mt-10 ml-5">
       <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">Name</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Zone</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">City</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Country</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Location</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
                  <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
        <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Name}</td>
      
                  
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Zone}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.City}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Country}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Location}</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-5 items-center">
                      <img className='w-[24px] h-[24px]' src={pin}/>
                      <img  className='w-[24px] h-[24px]' src={delet}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></div>)}
    
    </div>
  )
}

export default Stations
