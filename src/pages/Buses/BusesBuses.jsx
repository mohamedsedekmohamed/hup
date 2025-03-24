import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBuses from './NavBuses.jsx'
import ThreeThing from '../../component/ThreeThing.jsx';
import delet from  '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Swal from 'sweetalert2';

const BusesBuses = () => {
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
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
    }, [update])
  
    const handleDelete = (index, userName) => { 
      const token = localStorage.getItem('token');
      
      Swal.fire({
        title: `Are you sure you want to delete  bus${userName}?`, 
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
    
  

  const handleEdit = (index) => {
    const snedData = data.find((item) => item.id === index);
    
    navigate('/Buses/AddBuses', { state: { snedData } });
  }
      
  return (
    <div>
      <NavBuses/>   
<ThreeThing navGo='/Buses/AddBuses'/>     
<div className=" mt-10 ml-5">
            <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">BlusNumber</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left"> BlusType</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Capaclty</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">busImage</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Operator (Agent)</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Route</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
                   <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.bus_number}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.bus_type_name}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.capacity}</td>
              <td>  <img  className="w-5 h-5" src={item.bus_image===null?`data:image/png;base64,${item.bus_image}`:item.bus_image}/></td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.agent_name}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">****</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.status }</span></td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
                    <img className='w-[24px] h-[24px]' src={pin}
                                       onClick={() => handleEdit(item.id)} />
                                     <img
                                       className='w-[24px] h-[24px] ml-2 cursor-pointer'
                                       src={delet}
                                       onClick={() => handleDelete(item.id,item.bus_number)}   
                                       alt="delete"
                                     />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
    </div>
  )
}

export default BusesBuses
