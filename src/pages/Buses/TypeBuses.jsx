import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBuses from './NavBuses.jsx';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import ThreeThing from '../../component/ThreeThing.jsx';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { CiSearch } from "react-icons/ci"; // Import search icon for UI

const TypeBuses = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("https://bcknd.ticket-hub.net/api/admin/bus_types", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.bus_type);
        console.log(response.data.bus_type);
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
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/bus_type/delete/${index}`, {
          headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log('User deleted successfully:', response.data);
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
    navigate('/Buses/AddTypeBuses', { state: { snedData } });
  };

  const onchangething = (id, currentStatus) => {
    const token = localStorage.getItem('token');
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    axios.put(`https://bcknd.ticket-hub.net/api/admin/bus_types/status/${id}`, { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        console.log(`Status updated to ${newStatus}`);
        setUpdate(!update);
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  // Filter data based on the search query
  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seat_count.toString().includes(searchQuery) // Add filtering for seat count
    );
  });

  return (
    <div>
      <NavBuses />

      {/* Search Box */}
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
      <ThreeThing navGo='/Buses/AddTypeBuses' liked />
      </div>

      {/* Data Table */}
      <div className="mt-10 ml-5">
        <table className="w-full border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]'>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Name</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Bus Image</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Seats Count</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Plan Image</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Seats Image</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Status</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className='border-y hover:border-y-3 relative hover:bg-six'>
                <td className="w-[143px] h-[56px] text-[16px]">{item.name}</td>
                <td><img className="w-5 h-5" src={item.bus_image} alt="Bus" /></td>
                <td className="w-[143px] h-[56px] text-[16px]">{item.seat_count}</td>
                <td><img className="w-5 h-5" src={item.plan_image} alt="Plan" /></td>
                <td><img className="w-5 h-5" src={item.seats_image} alt="Seats" /></td>
                <td className="w-[143px] h-[56px] text-[16px] flex items-center gap-0.5">
                  <div className='flex my-auto'>
                    <StyledWrapper>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={item.status === "active"}  // Set the switch state based on the current status
                          onClick={() => onchangething(item.id, item.status)}  // Call the function to toggle status
                        />
                        <span className="slider" />
                      </label>
                    </StyledWrapper>
                  </div>
                </td>
                <td className="w-[143px] h-[56px] text-[16px] text-twelve">
                  <span className="font-normal p-2 rounded-[8px] flex">
                    <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                    <img className='w-[24px] h-[24px] ml-2 cursor-pointer' src={delet}
                      onClick={() => handleDelete(item.id, item.name)}   
                      alt="delete" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 31px;
    height: 17px;
  }

  .switch input {
    opacity: 1;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    transition: .4s;
    border-radius: 30px;
    border: 1px solid #ccc;
  }

  /* The slider's circle */
  .slider:before {
    position: absolute;
    content: "";
    height: 1em; /* تقليل حجم الدائرة */
    width: 1em; /* تقليل حجم الدائرة */
    border-radius: 50%; /* يجعلها دائرة */
    left: 1px; /* تحريكها قليلًا لتتناسب مع الحجم الجديد */
    top: 0;
    background-color: white;
    box-shadow: 0 2px 5px #999999;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #5fdd54;
    border: 1px solid transparent;
  }

  input:checked + .slider:before {
    transform: translateX(0.8em); /* تحريك الدائرة عند التبديل */
  }
`;

export default TypeBuses;
