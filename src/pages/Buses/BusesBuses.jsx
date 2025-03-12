import React from 'react'
import NavBuses from './NavBuses.jsx'
import ThreeThing from '../../component/ThreeThing.jsx';
import delet from  '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
const BusesBuses = () => {
    const data = [
        {  BlusNumber: 'bus 101', BlusType: 'Traveler', Capaclty:"Active",Operator:"cairo",Route:"***",Status:"Active", Action:"" },
      
      ];
     
      
  return (
    <div>
      <NavBuses/>   
<ThreeThing navGo='/Buses/AddBuses'/>     
<div className=" mt-10 ml-5">
            <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">BlusNumber</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left"> BlusType</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Capaclty</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Operator (Agent)</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Route</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
                  <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
        <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.BlusNumber}</td>
      
                  
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.BlusType}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Capaclty}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Operator}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Route}</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.Status }</span></td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
                      <img className='w-[24px] h-[24px]' src={pin}/>
                      <img  className='w-[24px] h-[24px]' src={delet}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
    </div>
  )
}

export default BusesBuses
