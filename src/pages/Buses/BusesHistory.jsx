import React from 'react'
import NavBuses from './NavBuses.jsx'
import ThreeThing from '../../component/ThreeThing.jsx';
import delet from  '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
const BusesHistory = () => {
  const data = [
    {  BlusNumber: 'bus 101', Date: '2025-3-5', PerformedBy:"Admin", Action:"" },
  ];
return (
<div>
  <NavBuses/>   
<ThreeThing navGo='/Buses/AddBusesHistory'/>     
<div className=" mt-10 ml-5">
        <table className="w-full  border-y border-black">
          <thead  className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]' >
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">BlusbNumber</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left"> Date</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Performed By</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
           
          {data.map((item,index) => (
              <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.BlusNumber}</td>
                <td className="w-[143px] h-[56px]  text-[16px] pr-4  ">{item.Date}</td>
                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.PerformedBy}</td>
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

export default BusesHistory
