import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
import NavBuses from './NavBuses.jsx';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import ThreeThing from '../../component/ThreeThing.jsx';
import Swal from 'sweetalert2';
import { CiSearch } from "react-icons/ci"; // Import search icon for UI

const BusesHistory = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedFilter, setSelectedFilter] = useState('');   
   const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("https://bcknd.ticket-hub.net/api/admin/aminites", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.aminty);
        console.log(response.data.aminty);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [update]);

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
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/aminity/delete/${index}`, {
          headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log('Amenities deleted successfully:', response.data);
            setUpdate(!update);
            Swal.fire('Deleted!', `${userName} has been deleted successfully.`, 'success'); 
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            Swal.fire('Error!', `There was an error while deleting ${userName}.`, 'error'); 
          });
      } else {
        Swal.fire('Cancelled', `${userName} was not deleted.`, 'info');  
      }
    });
  };

  const handleEdit = (id) => {
    const snedData = data.find((item) => item.id === id);
    navigate('/Buses/AddBusesHistory', { state: { snedData } });
  };

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
const cheose = ["Filter","name","status"
]
  const labelMap = {
    Filter: "Filter",
    name: "aminity",
    status: "status",
  };

  return (
    <div>
      <NavBuses/>   
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
      <ThreeThing navGo='/Buses/AddBusesHistory' liked
        labelMap={labelMap}
        cheose={cheose} // Pass the cheose array to ThreeThing component
        selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
        setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
 />     
      </div>

      <div className="mt-10 ml-5 hidden lg:block">
      <table className="w-full border-y border-x border-black ">
      <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]'>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left pl-3">Name</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Icon</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Status</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
                <tr key={index} className='border-y hover:border-3 relative hover:bg-six'>
                <td className="w-[143px] h-[56px] text-[16px] px-2 ">{item.name}</td>
                <td><img className="w-5 h-5" src={item.icon_link} alt="Icon" /></td>
                <td className="w-[143px] h-[56px] text-[16px]  ">{item.status}</td>
                <td className="w-[143px] h-[56px] text-[16px] flex justify-start gap-2 items-center">
                  <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                  <img className='w-[24px] h-[24px] ml-2 cursor-pointer' src={delet}
                    onClick={() => handleDelete(item.id, item.name)} 
                    alt="delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 ml-5 lg:hidden">
        <div className='w-[95%] bg-six'>
          {filteredData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 p-3'>
              <div className="flex gap-4">
                <strong>Name:</strong>
                <span>{item.name}</span>
              </div>
              <div className="flex gap-4">
                <strong>Status:</strong>
                <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">{item.status}</span>
              </div>
              <div className="flex gap-4">
                <strong>Icon:</strong>
                <img 
                  className="w-5 h-5"
                  src={item.icon_link === null ? `data:image/png;base64,${item.icon_link}` : item.icon_link}
                />
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
  );
}

export default BusesHistory;
