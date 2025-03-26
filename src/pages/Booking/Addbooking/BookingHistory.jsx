import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBooking from '../NavBooking'
import ThreeThing from '../../../component/ThreeThing'
const BookingHistory = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/booking/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.bookingHistory);
        console.log(response.data.bookingHistory);

      })
      .catch(error => {
        console.log(token);
        console.error('Error fetching data:', error);
      });
  }, [update])
  return (
 
<div>
<NavBooking/>
<ThreeThing like />
<div className=" mt-10 ml-5">
            <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">seats count</th>
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">bus_id</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">destenation from</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">destenation to</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">date</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
              <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
        <td className="w-[143px] h-[56px]  text-[16px] ">{item.seats_count}</td>
        <td className="w-[143px] h-[56px]  text-[16px] ">{item.bus_id}</td>
      
                  
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.destenation_from}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.destenation_to}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.date}</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.Status }</span></td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
      </div>
  )
}

export default BookingHistory
