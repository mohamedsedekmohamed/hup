import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBooking from '../NavBooking'
import ThreeThing from '../../../component/ThreeThing'

const CanceledBooking = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/booking/canceled", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.bookingCanceled);
        console.log(response.data.bookingCanceled);

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
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">destenation_from </th>
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">destenation_to</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">date </th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">seats_count</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.destenation_from}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.destenation_to}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.date}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.seats_count}</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.status }</span></td>
                
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
      </div>
  )
}

export default CanceledBooking
