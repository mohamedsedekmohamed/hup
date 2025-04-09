import React, { useEffect, useState } from 'react';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import ThreeThing from '../../component/ThreeThing';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci";
import 'react-toastify/dist/ReactToastify.css';
// import { CgOptions } from 'react-icons/cg';

const User = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedFilter, setSelectedFilter] = useState(''); // Track selected filter option
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.data);
      })
      .catch(() => {
        toast.error(" Error fetching data");
      });
  }, [update]);

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
        axios.delete(`https://bcknd.ticket-hub.net/api/admin/user/delete/${index}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            setUpdate(!update);
            Swal.fire('Deleted!', `${userName} has been deleted successfully.`, 'success'); 
          })
          .catch(() => {
            Swal.fire('Error!', `There was an error while deleting ${userName}.`, 'error'); 
          });
      } else {
        Swal.fire('Cancelled', `${userName} was not deleted.`, 'info');  
      }
    });
  };

  const handleEdit = (index) => {
    const snedData = data.find((item) => item.id === index);
    navigate('/AddUser', { state: { snedData } });
  };

  const Details = (index) => {
    const snedData = data.find((item) => item.id === index);
    navigate('/UserDetails', { state: { snedData } });
  };

  // Filtering data based on selected filter and search query
  const filteredData = data.filter((item) => {
    if (selectedFilter && item[selectedFilter]) {
      return item[selectedFilter].toString().toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectedFilter === '') {
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  });
  const [onevalue, setOneValue] = useState('');
const cheose = ["User", "email", "Country", "Cities", "Zones"]
  const names = ["User", "email", "Country", "Cities", "Zones", "Booking", "Action"];
  const fieldsToShow = ["name", "email", "country", "city", "zone", "Details", 'Booking'];

  return (
    <div>
      <ToastContainer />
      <div className='flex justify-between items-center mt-10 px-5'>
        <div className='flex justify-center items-center gap-3 relative'>
          <input
            placeholder='Search'
            className='w-full h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6' />
        </div>
        <ThreeThing 
          navGo='/AddUser' 
          liked 
          onevalue={onevalue} // Pass onevalue to ThreeThing component
          setOneValue={setOneValue} // Function to update onevalue
          cheose={cheose} // Pass the cheose array to ThreeThing component
          selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
          setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
        />
      </div>

      {/* Table for larger screens */}
      <div className="mt-10 ml-5 hidden lg:block">
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
            {filteredData.map((item, index) => (
              <tr key={index} className='border-y hover:border-y-3 relative hover:bg-six'>
                <td className="flex flex-col w-[143px] h-[56px] absolute top-1 items-start justify-start">
                  <span className="text-[16px] font-normal text-five px-1">{item.name}</span>
                  <span className="text-[16px] font-normal text-five px-1">{item.phone}</span>
                </td> 
                <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">{item.email}</td>
                <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">{item.country}</td>
                <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">{item.city}</td>
                <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">{item.zone}</td>
                <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[16px] px-1">
                  <button className='underline' onClick={() => Details(item.id)}>Details</button>
                </td>
                <td className="w-[143px] h-[56px] lg:text-[12px] xl:text-[16px] flex justify-start items-center">
                  <img className='w-[24px] h-[24px]' src={pin} onClick={() => handleEdit(item.id)} />
                  <img
                    className='w-[24px] h-[24px] ml-2 cursor-pointer'
                    src={delet}
                    onClick={() => handleDelete(item.id, item.name)}
                    alt="delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <div className="mt-10 ml-5 lg:hidden">
  <div className='w-[95%] bg-six'>
    {filteredData.map((item, index) => (
      <div key={index} className='flex flex-col gap-4 p-3'>
        
        {fieldsToShow.map((field, i) => (
                <div key={i} className="flex gap-4">
                  <span><strong>{names[i]}:</strong></span>
                  <span>{item[field] ? item[field] : "   "}</span>
                </div>
              ))}
        <div className='flex'><img className='w-[24px] h-[24px]' src={pin} 
                  onClick={()=>handleEdit(item.id)}/>
                  <img
                    className='w-[24px] h-[24px] ml-2 cursor-pointer'
                    src={delet}
                    onClick={() => handleDelete(item.id,item.name)}   
                    alt="delete"
                  /> </div>
        <div className='w-full bg-white h-2'></div>
      </div>
    ))}
</div>
</div>

    </div>
  );
};


export default User;
