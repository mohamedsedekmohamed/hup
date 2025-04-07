import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBooking from '../NavBooking'
import { useNavigate } from 'react-router-dom';
import ThreeThing from '../../../component/ThreeThing'
const BookingHistory = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/booking/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.userBookings);
        console.log(response.data.userBookings);

      })
      .catch(error => {
        console.log(token);
        console.error('Error fetching data:', error);
      });
  }, [update])

  const Details = (index) => {
    const snedData = data.find((item) => item.id === index);  
    navigate('/Bookingdetails', { state: { snedData}});
  }
  return (

    <div>
      <NavBooking />
      <ThreeThing like />
      <div className=" mt-10 ml-5">
        <table className="w-full  border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]' >
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left"> name</th>
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">country</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">city </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">zone </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">bookings</th>
            </tr>
          </thead>
          <tbody>

            {data.map((item, index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
                <td className="w-[143px] h-[56px]  text-[16px] ">{item.name}</td>
                <td className="w-[143px] h-[56px]  text-[16px] ">{item.country}</td>
                <td className="w-[143px] h-[56px]  text-[16px]  ">{item.city}</td>
                <td className="w-[143px] h-[56px]  text-[16px]  ">{item.zone}</td>
                <td className="w-[143px] h-[56px]  lg:text-[12px] xl:text-[16px] px-1 ">
                <button className='underline' onClick={()=>Details(item.id)}>Details</button></td>    
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookingHistory
