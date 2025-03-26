import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBooking from '../NavBooking'
import ThreeThing from '../../../component/ThreeThing'
import Swal from 'sweetalert2';

const CanceledBooking = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/booking/canceled", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.bookingCanceled);
        console.log(response.data.bookingCanceled);

      })
      .catch(error => {
        console.log(token);
        console.error('Error fetching data:', error);
      });
  }, [update])
  const token = localStorage.getItem('token');

  const handelconfirm=(id)=>{
    Swal.fire({
      title: `Are you sure you want to confirm ?`, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`https://bcknd.ticket-hub.net/api/admin/booking/confirm/${id}`,{
          headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log('User deleted successfully:', response.data);
            setUpdate(!update);
            Swal.fire('confirmed!', ` has been confirmed successfully.`, 'success'); 
          })
          .catch((error) => {
            console.error('Error deleting confirm:', error);
            Swal.fire('Error!', `There was an error while confirm.`, 'error'); 
          });
      } else {
    
        Swal.fire('Cancelled', ` it was not Cancelled.`, 'info');  
      }
    });


  }
  const handelcancel=(id)=>{
    
    Swal.fire({
      title: `Are you sure you want to confirm ?`, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`https://bcknd.ticket-hub.net/api/admin/booking/cancel/${id}`,{
          headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log('User deleted successfully:', response.data);
            setUpdate(!update);
            Swal.fire('canceled!', ` has been canceled successfully.`, 'success'); 
          })
          .catch((error) => {
            console.error('Error deleting cancel:', error);
            Swal.fire('Error!', `There was an error while cancel.`, 'error'); 
          });
      } else {
    
        Swal.fire('cancel', ` it was not Cancelled.`, 'info');  
      }
    });
  }
  return (
 
<div>
<NavBooking/>
<ThreeThing like />
<div className=" mt-10 ml-5">
            <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">destenation_from </th>
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">destenation_to</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">date </th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">seats_count</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
              <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.destenation_from}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.destenation_to}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.date}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.seats_count}</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.status }</span></td>
                 {item.status !=='canceled'?(  <td className="w-[143px]    flex gap-1 justify-center items-center h-12  ">
                      <button  className='bg-three py-1 px-2 rounded-[8px] text-white' onClick={()=>handelconfirm(item.id)}>confirm</button>
                      <button  className='bg-three py-1 px-2 rounded-[8px] text-white' onClick={()=>handelcancel(item.id)}>cancel</button>
                    </td>):(
                      <td></td>
                    )} 
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
      </div>
  )
}

export default CanceledBooking
