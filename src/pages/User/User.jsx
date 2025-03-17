import React, { useEffect, useState} from 'react';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import ThreeThing from '../../component/ThreeThing';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const User = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`, 
      }
    })
      .then(response => {
        setData(response.data.data);
        console.log(response.data.data);

      })
      .catch(error => {
        console.log(token);
        console.error('Error fetching data:', error);   
      });
  },[update])
 


  const handleDelete = (index) => {
    const token = localStorage.getItem('token');

    axios.delete(`https://bcknd.ticket-hub.net/api/admin/user/delete/${index}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    navigate('/AddUser', { state: { snedData}});  
  }

  return (
    <div>
      <ThreeThing navGo='/AddUser' />
      <div className="mt-10 ml-5">
        <table className="w-full border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]'>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">User</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">email</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Country</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Cities</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Zones</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Booking</th>
              <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
                <td className="flex flex-col w-[143px] h-[56px] absolute top-1 items-start justify-start">
                  <span className="text-[16px] font-normal text-five px-1">{item.name}</span>
                  <span className="text-[16px] font-normal text-five px-1">{item.phone}</span>
                </td>
                <td className="w-[143px] h-[56px] text-[16px] px-1">{item.email}</td>
                <td className="w-[143px] h-[56px] text-[16px] px-1">{item.country}</td>
                <td className="w-[143px] h-[56px] text-[16px] px-1">{item.city}</td>
                <td className="w-[143px] h-[56px] text-[16px] px-1">{item.zone}</td>
                <td className="w-[143px] h-[56px] text-[16px] px-1">{item.bookings}</td>
                <td className="w-[143px] h-[56px] text-[16px] flex justify-start items-center">
                  <img className='w-[24px] h-[24px]' src={pin} 
                  onClick={()=>handleEdit(item.id)}/>
                  <img
                    className='w-[24px] h-[24px] ml-2 cursor-pointer'
                    src={delet}
                    onClick={() => handleDelete(item.id)}   
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

export default User;
