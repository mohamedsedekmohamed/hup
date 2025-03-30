import React, { useEffect, useState} from 'react';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Threething from '../../component/ThreeThing';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Trips = () => {
   const [data, setData] = useState([]);
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
        console.log(response.data.trips);

      })
      .catch(error => {
        console.log(token);
        console.error('Error fetching data:', error);   
      });
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
          .then((response) => {
            console.log('trip deleted successfully:', response.data);
            setUpdate(!update);
            Swal.fire('Deleted!', `${userName} has been deleted successfully.`, 'success'); 
          })
          .catch((error) => {
            console.error('Error deleting trip:', error);
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
  const view = (index) => {
    const view = data.find((item) => item.id === index);
    navigate('/ViewTrips', { state: { view}});  
  }
  return (
    <div>
      <Threething navGo='/AddTrips'/>
          <div className=" mt-10 ml-5">
                  <table className="w-full  border-y border-black">
                    <thead  className="w-full">
                      <tr className='bg-four w-[1012px] h-[56px]' >
                        <th className="w-[158px] h-[56px]  text-[12px] border-b text-left">name</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left"> trip type</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">date</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">departure time</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">arrival time</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">price</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">currency name</th>
                        {/* <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left"> view</th> */}
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left"> status</th>
                        <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                     
                    {data.map((item,index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
                             <td className="w-[143px] h-[56px]  text-[16px]  ">{item.name}</td>
                          <td className="w-[143px] h-[56px]  text-[12px]  ">{item.trip_type}</td>
                          <td className="w-[143px] h-[56px]  text-[12px] ">{item.date}</td>
                          <td className="w-[143px] h-[56px]  text-[12px]  ">{item.departure_time}</td>
                          <td className="w-[143px] h-[56px]  text-[12px]  ">{item.arrival_time}</td>
                          <td className="w-[143px] h-[56px]  text-[12px]  ">{item.price}</td>
                          <td className="w-[143px] h-[56px]  text-[12px]  ">{item.currency_name}</td>
                          {/* <td className="w-[143px] h-[56px]  text-[12px]  "><button onClick={()=>view(item.id)}>****</button></td> */}
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
    </div>
  )
}

export default Trips
