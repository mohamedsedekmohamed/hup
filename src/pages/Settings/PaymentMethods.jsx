import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import ThreeThing from '../../component/ThreeThing.jsx';

const PaymentMethods = () => {
      const [data, setData] = useState([]);
      const [update, setUpdate] = useState(false);
      const navigate = useNavigate();
      useEffect(() => {  const token = localStorage.getItem('token');

        axios.get("https://bcknd.ticket-hub.net/api/admin/payment_methods", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
          .then(response => {
            setData(response.data);
            console.log(response.data);
    
          })
          .catch(error => {
            console.log(token);
            console.error('Error fetching data:', error);
          });
      }, [update])
      const handleDelete = (index) => {
        const token = localStorage.getItem('token');
    
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/payment_method/delete/${index}`, {
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
      }
      const handleEdit = (index) => {
        const snedData = data.find((item) => item.id === index);
        
        navigate('/Settings/AddPaymentMethods', { state: { snedData } });
      }
  return (
    <div>
    <div>

      <ThreeThing navGo='/Settings/AddPaymentMethods' />
      <div className=" mt-10 ml-5">
        <table className="w-full  border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]' >
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left"> Name</th>
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left"> image</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>

            {data.map((item, index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
               

                                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.name}</td>
                                <img  className="w-5 h-5"src={item.image===null?`data:image/png;base64,${item.image}`:item.image}/>

                <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.status}</span></td>
                <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
                  <img className='w-[24px] h-[24px]' src={pin}
                    onClick={() => handleEdit(item.id)} />
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
            
    </div>
  )
}

export default PaymentMethods
