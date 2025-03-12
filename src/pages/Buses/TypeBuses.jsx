import React from 'react'
import NavBuses from './NavBuses.jsx'
import delet from  '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import ThreeThing from '../../component/ThreeThing.jsx';

const TypeBuses = () => {
  const data = [
    {  Name: 'VIP Bus', BlusImage: '', SeatsCount:"30",PalnImage:"",SeatsImage:"",Status:"", Action:"" },
  ];
 
  return (
    <div>
            <NavBuses/>
            <ThreeThing navGo='/Buses/AddTypeBuses'/>     
<div className=" mt-10 ml-5">
            <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">Name</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left"> Blus Image</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Seats Count</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Paln Image</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Seats Image</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
                  <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Name}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.BlusImage}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.SeatsCount}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.PalnImage}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.SeatsImage}</td>
                    <td className='w-[143px] h-[56px]  text-[16px]'> 
                      <button>O</button>
                  
                      <button>OFF</button>
                    </td>
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


export default TypeBuses
