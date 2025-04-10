import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; import NavTrains from './NavTrains'
import ThreeThing from '../../component/ThreeThing.jsx';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Swal from 'sweetalert2';
import { CiSearch } from "react-icons/ci"; // Import search icon for UI

const Trains = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
   const [searchQuery, setSearchQuery] = useState(''); 
        const [selectedFilter, setSelectedFilter] = useState(''); 
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem('token');

      axios.get("https://bcknd.ticket-hub.net/api/admin/trains", {
          headers: {
              Authorization: `Bearer ${token}`,
          }
      })
          .then(response => {
              setData(response.data.train);
              console.log(response.data.train);

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

              axios.delete(`https://bcknd.ticket-hub.net/api/admin/train/delete/${index}`, {
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

      navigate('/Train/Addtrains', { state: { snedData } });
  }
  const filteredData = data.filter((item) => {
    if(selectedFilter==="Filter"){
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedFilter && item[selectedFilter]) {
      return item[selectedFilter].toString().toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectedFilter === '') {
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  });

const cheose = ["Filter","name","agent","route","country",
]
const labelMap = {
Filter: "Filter",
name: "class",
agent:"agent",
route:'route',
country:"country",

};
  return (
    <div>
    <NavTrains />
    <div className='flex justify-between items-center mt-10 px-5'>
        <div className='flex justify-center items-center gap-3 relative'>
          <input
            placeholder='Search'
            className='w-full h-10 lg:h-[48px] border-2 border-two rounded-[8px] pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
          <CiSearch className='w-4 h-4 md:w-6 text-black font-medium absolute left-2 md:h-6' />
        </div>
        <ThreeThing navGo='/Train/Addtrains' liked
           labelMap={labelMap}
           cheose={cheose} // Pass the cheose array to ThreeThing component
           selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
           setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
        />
      </div>
    <div className=" mt-10 ml-5">
        <table className="w-full  border-y border-black">
            <thead className="w-full">
                <tr className='bg-four w-[1012px] h-[56px]' >
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">Class </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">agent </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">type </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">route </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">Class </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">country </th>
                    <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">Status </th>
                    <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                </tr>
            </thead>
            <tbody>

                {filteredData.map((item, index) => (
                    <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item.name}</td>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item.agent}</td>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item.type}</td>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item.route}</td>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item.country}</td>
                        <td className="w-[143px] h-[56px]  text-[14px]  ">{item.class}</td>
    <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">
      {item.status===1 ? "active" : "inactive"}
      </span></td>

                        <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
                            <img className='w-[24px] h-[24px]' src={pin}
                                onClick={() => handleEdit(item.id)} />
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
</div>
  )
}

export default Trains
