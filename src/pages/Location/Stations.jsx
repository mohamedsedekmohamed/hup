import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThreeThing from '../../component/ThreeThing';
import NavLocation from './NavLocation';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Tiglebutton from '../../ui/Tiglebutton';

const Stations = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [feel,setFeel]=useState()
  const [action, setAction] = useState(() => localStorage.getItem('action') || 'on');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://bcknd.ticket-hub.net/api/admin/stations', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setData(response.data.stations);
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [update]);

  const handleDelete = (index) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://bcknd.ticket-hub.net/api/admin/stations/delete/${index}`, {
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
    const snedData = data.find((item) => item.id === index);
    navigate('/AddUser', { state: { snedData } });
  };

  const handleToggle = (newAction) => {
    setAction(newAction);
    localStorage.setItem('action', newAction);
  };

  const renderTableon = () => {
    return (
      <div className="mt-10 ml-5">
        <table className="w-full border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]'>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Name</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Country</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">City</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Zone</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">status</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
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
  const renderTableoff = () => {
    return (
      <div className="mt-10 ml-5">
        <table className="w-full border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]'>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Name</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Country</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">City</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Zone</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">status</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
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
      <ThreeThing navGo='/Location/AddOffStation' />
      {action === 'on' ? renderTableon() : renderTableoff()}
    </div>
  );
};

export default Stations;
