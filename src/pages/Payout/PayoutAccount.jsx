import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ThreeThing from '../../component/ThreeThing.jsx';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
const PayoutAccount = () => {
  const [data, setData] = useState([]);
       const [update, setUpdate] = useState(false);
       useEffect(() => {  const token = localStorage.getItem('token');
 
         axios.get("https://bcknd.ticket-hub.net/api/admin/payoutRequest", {
           headers: {
             Authorization: `Bearer ${token}`,
           }
         })
           .then(response => {
             setData(response.data.payout);
             console.log(response.data.payout);
     
           })
           .catch(error => {
             console.log(token);
             console.error('Error fetching data:', error);
           });
       }, [update])
      const handlecancel = (id) => {
        const token = localStorage.getItem('token');

        axios
        .put(`https://bcknd.ticket-hub.net/api/admin/payoutRequest/confirm/${id}`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('confirm added successfully:', response.data);
          toast.success('confirm  successfully');
          setUpdate(!update)
        
        })
        .catch((error) => {
          console.error('confirm  resolve:', error);
          toast.error('confirm  resolve:', error)
        });
      }
return (
  <div>
    <div>

      <ThreeThing like />
      <div className=" mt-10 ml-5">
        <table className="w-full  border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]' >
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left"> date</th>
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left"> amount</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">currency</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">agent</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>

            {data.map((item, index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
               

                                <td className="w-[143px] h-[56px]  text-[16px] ">{item.date}</td>
                                <td className="w-[143px] h-[56px]  text-[16px]  ">{item.amount}</td>
                                <td className="w-[143px] h-[56px]  text-[16px]  ">{item.currency.name}{item.currency.symbol}</td>
                                <td className="w-[143px] h-[56px]  text-[16px] ">{item.agent.name}</td>

                <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal  rounded-[8px]">{item.status}</span></td>
                <td className="w-[143px] h-[56px]  text-[16px]  ">  <button onClick={()=>handlecancel(item.id)} className='bg-three py-1 px-2 rounded-[8px] text-white'>
                confirm
                    </button>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
                            <ToastContainer />
            
    </div>
)
}

export default PayoutAccount
