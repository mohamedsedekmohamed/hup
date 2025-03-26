import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThreeThing from '../../component/ThreeThing.jsx';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Swal from 'sweetalert2';

const Nationality = () => {
   const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
  
      axios.get("https://bcknd.ticket-hub.net/api/admin/nationalities", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          setData(response.data.nationalities);
          console.log(response.data.nationalities);
  
        })
        .catch(error => {
          console.log(token);
          console.error('Error fetching data:', error);
        });
    }, [update])
  
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
        
          axios.delete(`https://bcknd.ticket-hub.net/api/admin/nationality/delete/${index}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log('nationality deleted successfully:', response.data);
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
      
      navigate('/Settings/AddNationality', { state: { snedData } });
    }
  return (
    <div>
   <ThreeThing navGo='/Settings/AddNationality' />
      <div className=" mt-10 ml-5">
        <table className="w-full  border-y border-black">
          <thead className="w-full">
            <tr className='bg-four w-[1012px] h-[56px]' >
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left"> Name</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>

            {data.map((item, index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>  
                <td className="">
                  <span className='w-[143px] h-[56px]  text-[16px] px-4'>{item.name}</span>
                  </td>


                <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
                  <img className='w-[24px] h-[24px]' src={pin}
                    onClick={() => handleEdit(item.id)} />
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

export default Nationality
