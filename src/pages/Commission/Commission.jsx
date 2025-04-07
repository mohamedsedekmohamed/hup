import React, { useEffect, useState} from 'react';
import pin from '../../assets/pin.svg';
import ThreeThing from '../../component/ThreeThing';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Commission = () => {
   const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
      const token = localStorage.getItem('token');
  
      axios.get("https://bcknd.ticket-hub.net/api/admin/defaultCommission ", {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      })
        .then(response => {
          setData(response.data.default_commission);
          console.log(response.data.default_commission);
  
        })
        .catch(error => {
          console.log(token);
          console.error('Error fetching data:', error);   
        });
    },[update])
    const handleEdit = () => {
      
      navigate('/AddCommission');  
    }
  return (
    <div>
        <ThreeThing like />
       <div className=" mt-10 ml-5">
            <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">train </th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">bus </th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">hiace</th>
                  <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>

                </tr>
              </thead>
              <tbody>
               
            
                  <tr  className='border-y relative hover:bg-six hover:border-y-2'>
        <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{data.train}%</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{data.bus}%</td>
                    <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{data.hiace}%</td>
                    <td className="w-[143px] h-[56px]  lg:text-[12px] xl:text-[16px] flex justify-start items-center">
                                    <img className='w-[24px] h-[24px]' src={pin} 
                                    onClick={()=>handleEdit()}/>
                                                               </td>
                  </tr>
              </tbody>
            </table>
          </div>
    </div>
  )
}


export default Commission
