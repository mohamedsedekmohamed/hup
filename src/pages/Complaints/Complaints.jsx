import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

import delet from  '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import ThreeThing from '../../component/ThreeThing'
const Complaints = () => {
    const [data, setData] = useState([]);
     const [update, setUpdate] = useState(false);
     const navigate = useNavigate();
     const token = localStorage.getItem('token');

     useEffect(() => {
  
      axios.get("https://bcknd.ticket-hub.net/api/admin/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          setData(response.data.complaints);
          console.log(response.data.citcomplaintsies);
  
        })
        .catch(error => {
          console.log(token);
          console.error('Error fetching data:', error);
        });
    }, [update])
    const handleDelete = (index, subject_id) => { 
      
      Swal.fire({
        title: `Are you sure you want to delete ${subject_id}?`, 
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
     axios.delete(`https://bcknd.ticket-hub.net/api/admin/complaint/delete/${index}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log('User deleted successfully:', response.data);
              setUpdate(!update);
              Swal.fire('Deleted!', `${subject_id} has been deleted successfully.`, 'success'); 
            })
            .catch((error) => {
              console.error('Error deleting user:', error);
              Swal.fire('Error!', `There was an error while deleting ${subject_id}.`, 'error'); 
            });
        } else {
      
          Swal.fire('Cancelled', `${subject_id} was not deleted.`, 'info');  
        }
      });
    };
    const handleEdit = (index) => {
      const snedData = data.find((item) => item.id === index);
      navigate('/AddComplaints', { state: { snedData } });
    }
    const handreject=(id,message)=>{

      axios
      .put(`https://bcknd.ticket-hub.net/api/admin/complaint/reject/${id}`,message ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('reject  successfully:', response.data);
        toast.success('reject  successfully');
      
      })
      .catch((error) => {
        console.error('Error  reject:', error);
        toast.error('Error  reject:', error)
      });
    }
    const handresolve=(id,message)=>{
      const token = localStorage.getItem('token');

      axios
      .put(`https://bcknd.ticket-hub.net/api/admin/complaint/resolve/${id}`,message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('resolve added successfully:', response.data);
        toast.success('resolve  successfully');
      
      })
      .catch((error) => {
        console.error('Error  resolve:', error);
        toast.error('Error  resolve:', error)
      });
    }
  return (
    <div>
        <ThreeThing navGo='/AddComplaints' />
       <div className=" mt-10 ml-5">
            <table className="w-full  border-y border-black">
              <thead  className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                  
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">message</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">date</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">reject</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">resolve</th>
              
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                  <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
               
              {data.map((item,index) => (
                  <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
      
                  
                    <td className="w-[143px] h-[56px]  text-[16px]  ">{item.message}</td>
                    <td className="w-[143px] h-[56px]  text-[16px] ">{item.date}</td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">  <button onClick={()=>handreject(item.id,item.message)} className='bg-three py-1 px-2 rounded-[8px] text-white'>
                     reject
                    </button>
                    </td>
                    <td className="w-[143px] h-[56px]  text-[16px]  ">  <button onClick={()=>handresolve(item.id,item.message)} className='bg-three py-1 px-2 rounded-[8px] text-white'>
                    resolve
                    </button>
                    </td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  text-yellow-500  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.status }</span></td>
                    <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
                      <img className='w-[24px] h-[24px]'
                                          onClick={() => handleEdit(item.id)} 

                      src={pin}/>
 <img
                    className='w-[24px] h-[24px] ml-2 cursor-pointer'
                    src={delet}
                    onClick={() => handleDelete(item.id,item.message)}   
                    alt="delete"
                  />                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
                <ToastContainer />
          
    </div>
  )
}

export default Complaints
