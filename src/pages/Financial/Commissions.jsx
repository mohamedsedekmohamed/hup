import React, { useEffect, useState} from 'react';
import ThreeThing from '../../component/ThreeThing'
import axios from 'axios';
const Commissions = () => {
  const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(()=>{
      const token = localStorage.getItem('token');
  
      axios.get("https://bcknd.ticket-hub.net/api/admin/confirmed_payments", {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      })
        .then(response => {
          setData(response.data.confirmedPayment);
          console.log(response.data.confirmedPayment);
  
        })
        .catch(error => {
          console.log(token);
          console.error('Error fetching data:', error);   
        });
    },[update])
  return (
    <div>
         <ThreeThing navGo='/Location/AddZones' like/>
       <div className=" mt-10 ml-5">
            <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">amount</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">receipt image</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">travelers</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">travel_date</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">total</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">status</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.amount}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">  <img  className="w-5 h-5"src={item.receipt_image===null?`data:image/png;base64,${item.receipt_image}`:item.receipt_image}/> </td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.travelers}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.travel_date}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.total}</td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.status }</span></td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      
    </div>
  )
}

export default Commissions
