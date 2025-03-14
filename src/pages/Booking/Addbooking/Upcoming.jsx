import React from 'react'
import NavBooking from '../NavBooking'
import ThreeThing from '../../../component/ThreeThing'

const Upcoming = () => {
  const data = [
    {  BookingID: 'bk 2011', UserName: 'ahmed', Destination:"riyadh-jaddah",tripDate:"2025",Seats:"2",Status:"Upcoming", Action:"**" },
  
  ];
  return (
    <div>
<NavBooking/>
<ThreeThing like />
<div className=" mt-10 ml-5">
            <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">BookingID</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left"> User Name</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Destination</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">trip Date</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Seats</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
                  <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
        <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.BookingID}</td>
      
                  
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.UserName}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Destination}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.tripDate}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Seats}</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  text-yellow-400  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.Status }</span></td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Action}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
      </div>
  )
}

export default Upcoming
