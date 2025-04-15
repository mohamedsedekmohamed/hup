import React, { useEffect, useState} from 'react';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Threething from '../../component/ThreeThing';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import ThreeThing from '../../component/ThreeThing';

import Swal from 'sweetalert2'
const Trips = () => {
   const [data, setData] = useState([]);
     const [searchQuery, setSearchQuery] = useState(''); 
     const [selectedFilter, setSelectedFilter] = useState(''); // Track selected filter option
   const [update, setUpdate] = useState(false);
   const navigate = useNavigate();
   
   useEffect(()=>{
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/trips", {
      headers: {
        Authorization: `Bearer ${token}`, 
      }
    })
      .then(response => {
        setData(response.data.trips);

      })
   
  },[update])

  const handleDelete = (index, userName) => { 
    const token = localStorage.getItem('token');
    
    Swal.fire({
      title: `Are you sure you want to delete ${userName}?`, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/user/trip/${index}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setUpdate(!update);
            Swal.fire('Deleted!', `${userName} has been deleted successfully.`, 'success'); 
          })
          .catch(() => {
            Swal.fire('Error!', `There was an error while deleting ${userName}.`, 'error'); 
          });
      } else {
    
        Swal.fire('Cancelled', `${userName} was not deleted.`, 'info');  
      }
    });
  };
  const handleEdit = (index) => {
    const snedData = data.find((item) => item.id === index);
    navigate('/AddTrips', { state: { snedData}});  
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
const cheose = ["Filter","name", "trip_type", "date", "departure_time", "arrival_time", "price", "currency","status"]
const labelMap = {
  Filter: "Filter",
  name: "name",
  trip_type: "trip",
  date: "date",
  departure_time:"departure",
  price:"price",
  currency:"currency",
  arrival_time:"arrival"
};
  return (
    <div>
       <div className='flex justify-between items-center mt-10 px-5'>
              <div className='flex justify-center items-center gap-3 relative'>
                <input
                  placeholder='Search'
                  className='w-full h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6' />
       
              </div>
              <ThreeThing 
                navGo='/AddTrips' 
                liked 
                labelMap={labelMap}
                cheose={cheose} // Pass the cheose array to ThreeThing component
                selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
                setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
              />
             
            </div>
      
            <div className="mt-10 ml-5 hidden lg:block">
            <table className="w-full border-y border-x border-black ">
            <thead  className="w-full">
                      <tr className='bg-four w-[1012px] h-[56px]' >
                        <th className="w-[158px] h-[56px]  text-[12px] border-b text-left pl-3">name</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">type</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">date</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">departure time</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">arrival time</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">price</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">currency </th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left"> status</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                     
                    {filteredData.map((item,index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                             <td className="w-[143px] h-[56px]  text-[12px] px-2 ">{item.name}</td>
                          <td className="w-[143px] h-[56px]  text-[12px]  ">{item.trip_type}</td>
                          <td className="w-[143px] h-[56px]  text-[12px] ">{item.date}</td>
                          <td className="w-[143px] h-[56px]  text-[12px]  ">{item.departure_time}</td>
                          <td className="w-[143px] h-[56px]  text-[12px]  ">{item.arrival_time}</td>
                          <td className="w-[143px] h-[56px]  text-[12px]  ">{item.price}</td>
                          <td className="w-[143px] h-[56px]  text-[12px]  ">{item.currency_name}</td>
                          <td className="w-[143px]  h-[56px]  text-[12px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.status }</span></td>
                          <td className="w-[143px]  h-[56px]  text-[12px]  flex justify-start gap-2 items-center">
                      <img className='w-[24px] h-[24px]' src={pin} 
                                   onClick={()=>handleEdit(item.id)}/>
                                   <img
                                     className='w-[24px] h-[24px] ml-2 cursor-pointer'
                                     src={delet}
                                     onClick={() => handleDelete(item.id,item.name)}   
                                     alt="delete"
                                   />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                    {/* Mobile view */}
                <div className="mt-10 ml-5 lg:hidden">
                  <div className='w-[95%] bg-six'>
                    {filteredData.map((item, index) => (
                      <div key={index} className='flex flex-col gap-4 p-3'>
                        <div className="flex gap-4">
                          <strong>name:</strong>
                          <span>{item.name}</span>
                        </div>
                        <div className="flex gap-4">
                          <strong>type:</strong>
                          <span>{item.trip_type}</span>
                        </div>
                        <div className="flex gap-4">
                          <strong>date:</strong>
                          <span>{item.date}</span>
                        </div>
                        <div className="flex gap-4">
                          <strong>departure time:</strong>
                          <span>{item.departure_time}</span>
                        </div>
                        <div className="flex gap-4">
                          <strong>arrival time:</strong>
                          <span>{item.arrival_time}</span>
                        </div>
                        <div className="flex gap-4">
                          <strong>price:</strong>
                          <span>{item.price}</span>
                        </div>
                        <div className="flex gap-4">
                          <strong>currency:</strong>
                          <span>{item.currency_name}</span>
                        </div>

                        <div className="flex gap-4">
                          <strong>Status:</strong>
                          <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">{item.status}</span>
                        </div>
                     
                        <div className='flex'>
                          <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                          <img
                            className='w-[24px] h-[24px] ml-2 cursor-pointer'
                            src={delet}
                            onClick={() => handleDelete(item.id,item.name)}   
                            alt="delete"
                          />
                        </div>
                        <div className='w-full bg-white h-2'></div>
                      </div>
                    ))}
                  </div>
                </div>
    </div>
  )
}

export default Trips
