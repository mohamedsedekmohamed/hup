import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThreeThing from '../../component/ThreeThing';
import NavLocation from './NavLocation';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Tiglebutton from '../../ui/Tiglebutton';
import { CiSearch } from 'react-icons/ci'; // Import the search icon for the search field

const Stations = () => {
  const [data, setData] = useState([]);
  const [datatwo, setDatatwo] = useState([]);
  const [update, setUpdate] = useState(false);
  const [action, setAction] = useState(() => localStorage.getItem('action') || 'on');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://bcknd.ticket-hub.net/api/admin/stations', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setData(response.data.dropoff);
        setDatatwo(response.data.pickup);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [update]);

  const handleDelete = (index) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://bcknd.ticket-hub.net/api/admin/station/delete/${index}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        console.log('User deleted successfully:', response.data);
        setUpdate(!update);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleEdit = (index) => {
    if (action === 'on') {
      const sendData = datatwo.find((item) => item.id === index);
      navigate('/Location/AddOffStation', { state: { sendData } });
    } else {
      const sendData = data.find((item) => item.id === index);
      navigate('/Location/AddOffStation', { state: { sendData } });
    }
  };

  const handleToggle = (newAction) => {
    setAction(newAction);
    localStorage.setItem('action', newAction);
  };

  // Filter function for search query
  const filterData = (items) => {
    return items.filter(item => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.zone_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const renderTable = (items) => {
    return (
      <div className="mt-10 ml-5">
        <table className="w-full border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]'>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Name</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Country</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">City</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Zone</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Status</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData(items).map((item, index) => (
              <tr key={index} className='border-y hover:border-y-3 relative hover:bg-six'>
                <td className="w-[143px] h-[56px] text-[16px] ">{item.name}</td>
                <td className="w-[143px] h-[56px] text-[16px] ">{item.country_name}</td>
                <td className="w-[143px] h-[56px] text-[16px] ">{item.city_name}</td>
                <td className="w-[143px] h-[56px] text-[16px] ">{item.zone_name}</td>
                <td className="w-[143px] h-[56px] text-[16px] ">{item.status}</td>
                <td className="w-[143px] h-[56px] text-[16px] flex justify-start gap-5 items-center">
                  <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                  <img className='w-[24px] h-[24px] ml-2 cursor-pointer' src={delet} onClick={() => handleDelete(item.id)} alt="delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <NavLocation />
      <div className='flex ml-6 mt-6 gap-6'>
        <Tiglebutton action={action === 'on' ? 'on' : 'off'} onClick={() => handleToggle('on')} title='Pick-up' />
        <Tiglebutton action={action === 'on' ? 'off' : 'on'} onClick={() => handleToggle('off')} title='Drop-off' />
      </div>

      {/* Search Bar */}
      <div className='flex justify-between items-center gap-3 relative mt-6 px-5'>
        
        <input
          placeholder='Search'
          className=' h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
        />
        <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-6 md:h-6' />
      <ThreeThing navGo='/Location/AddOffStation' liked />
      </div>


      {/* Render Table Based on Toggle State */}
      {action === 'on' ? renderTable(datatwo) : renderTable(data)}
    </div>
  );
};

export default Stations;
