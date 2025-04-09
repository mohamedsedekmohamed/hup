import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBuses from './NavBuses.jsx';
import ThreeThing from '../../component/ThreeThing.jsx';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Swal from 'sweetalert2';
import { CiSearch } from "react-icons/ci"; // Import search icon for UI

const BusesBuses = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get("https://bcknd.ticket-hub.net/api/admin/busses", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.buses);
        console.log(response.data.buses);
      })
      .catch(error => {
        console.log(token);
        console.error('Error fetching data:', error);
      });
  }, [update]);

  const handleDelete = (index, busNumber) => {
    Swal.fire({
      title: `Are you sure you want to delete bus ${busNumber}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/bus/delete/${index}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            console.log('Bus deleted successfully:', response.data);
            setUpdate(!update);
            Swal.fire('Deleted!', `${busNumber} has been deleted successfully.`, 'success');
          })
          .catch((error) => {
            console.error('Error deleting bus:', error);
            Swal.fire('Error!', `There was an error while deleting bus ${busNumber}.`, 'error');
          });
      } else {
        Swal.fire('Cancelled', `Bus ${busNumber} was not deleted.`, 'info');
      }
    });
  };

  const handleEdit = (index) => {
    const snedData = data.find((item) => item.id === index);
    navigate('/Buses/AddBuses', { state: { snedData } });
  };

  // Filter data based on the search query
  const filteredData = data.filter((item) => {
    return (
      item.bus_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bus_type_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.agent_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <NavBuses />
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
        <ThreeThing navGo='/Buses/AddBuses' liked/>
      </div>

      <div className="mt-10 ml-5">
        <table className="w-full border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]'>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">agent </th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">email</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Capacity</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Bus Image</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Operator (Agent)</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Route</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Status</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Amenities</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className='border-y hover:border-y-3 relative hover:bg-six'>
                <td className="w-[143px] h-[56px] text-[16px] ">{item.agent_name}</td>
                <td className="w-[143px] h-[56px] text-[12px]">{item.agent_email}</td>
                <td className="w-[143px] h-[56px] text-[16px]">{item.capacity}</td>
                <td><img className="w-5 h-5" src={item.bus_image === null ? `data:image/png;base64,${item.bus_image}` : item.bus_image} alt="Bus" /></td>
                <td className="w-[143px] h-[56px] text-[16px]">{item.agent_name}</td>
                <td className="w-[143px] h-[56px] text-[16px]">****</td>
                <td className="w-[143px] h-[56px] text-[16px] text-nine">
                  <span className="bg-eight font-normal p-2 rounded-[8px]">{item.status}</span>
                </td>
                <td className="w-[143px] h-[56px] text-[16px]">
                  {item.amenities && item.amenities.length > 0
                    ? item.amenities.map((amenity, index) => (
                      <span className='text-[12px]' key={index}>{amenity.name}{index < item.amenities.length - 1 && '-'}</span>
                    ))
                    : 'No amenities'}
                </td>
                <td className="w-[143px] h-[56px] text-[16px] flex justify-start gap-2 items-center">
                  <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                  <img
                    className='w-[24px] h-[24px] ml-2 cursor-pointer'
                    src={delet}
                    onClick={() => handleDelete(item.id, item.bus_number)}
                    alt="delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusesBuses;
