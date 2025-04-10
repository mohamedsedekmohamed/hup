import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBooking from '../NavBooking'
import { useNavigate } from 'react-router-dom';
import ThreeThing from '../../../component/ThreeThing'
import { CiSearch } from "react-icons/ci"; // Import search icon for UI

const BookingHistory = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
   const [searchQuery, setSearchQuery] = useState(''); 
        const [selectedFilter, setSelectedFilter] = useState(''); 
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
  const filteredData = data.filter((item) => {
    if(selectedFilter==="Filter"){
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedFilter && item[selectedFilter]) {
      return item[selectedFilter].toString().toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectedFilter === '') {
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  });

const cheose = ["Filter","name","email",'phone',"country",'city',"zone"
]
const labelMap = {
Filter: "Filter",
name: "name",
email:"email",
phone:"phone",
country:"country",
city:"city",
zone:"zone"


};
  return (

    <div>
      <NavBooking />
      <div className='flex justify-between items-center mt-10 px-5'>
        <div className='flex justify-center items-center gap-3 relative'>
          <input
            placeholder='Search'
            className='w-full h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
          <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6' />
        </div>
        <ThreeThing navGo='/Train/AddTrainClass' liked
           labelMap={labelMap}
           cheose={cheose} // Pass the cheose array to ThreeThing component
           selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
           setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
        />
      </div>
      <div className=" mt-10 ml-5">
        <table className="w-full  border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]' >
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left"> name</th>
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left"> gmail</th>
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">country</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">city </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">zone </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">bookings</th>
            </tr>
          </thead>
          <tbody>

            {filteredData.map((item, index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
                <td className="w-[143px] h-[56px]  text-[14px] ">{item.name}</td>
                <td className="w-[143px] h-[56px]  text-[12px] ">{item.email}</td>
                <td className="w-[143px] h-[56px]  text-[14px] ">{item.country}</td>
                <td className="w-[143px] h-[56px]  text-[14px]  ">{item.city}</td>
                <td className="w-[143px] h-[56px]  text-[14px]  ">{item.zone}</td>
                <td className="w-[143px] h-[56px]  lg:text-[12px] xl:text-[16px] px-1 ">
                <button className='underline bg-three px-2 py-1 rounded-4xl' onClick={()=>Details(item.id)}>Details</button></td>    
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookingHistory
