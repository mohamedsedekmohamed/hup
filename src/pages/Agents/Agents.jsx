import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThreeThing from '../../component/ThreeThing.jsx';
import delet from '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
import Swal from 'sweetalert2';
import { CiSearch } from "react-icons/ci";

const Agents = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedFilter, setSelectedFilter] = useState(''); // Track selected filter option
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/operators", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.operators);
        console.log(response.data.operators);

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

        axios.delete(`https://bcknd.ticket-hub.net/api/admin/operator/delete/${index}`, {
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
  const show = (commissions) => {
    const commission = commissions[0]; 
  if(commission){
    Swal.fire({
      title: `Commission train: ${commission.train}
      Commission bus: ${commission.bus}
      Commission hiace: ${commission.hiace}`,
      icon: 'success',
      confirmButtonText: 'OK', // زر "OK" بعد عرض القيمة
    });}
    else{
      Swal.fire({
        title: ` no Commissions `,
        icon: 'success',
        confirmButtonText: 'OK', // زر "OK" بعد عرض القيمة
      });}
  };
  
  
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
const cheose = ["Filter","name", "phone", "role", "points", "email"]
const labelMap = {
  Filter: "Filter",
  name: "name",
  phone: "phone",
  role: "role",
  points:"points",
  email:"email"
};
  

  const handleEdit = (index) => {
    const snedData = data.find((item) => item.id === index);

    navigate('/AddAgents', { state: { snedData } });
  }
  return (
    <div>
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
          navGo='/AddAgents' 
          liked 
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
              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">name</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">phone</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">points </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">role </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">email </th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">commission</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">image</th>
              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>

            {filteredData.map((item, index) => (
              <tr key={index} className=' border-y hover:border-y-3 relative hover:bg-six  '>
                <td className="w-[143px] h-[56px]  text-[16px]  ">{item.name}</td>
                <td className="w-[143px] h-[56px]  text-[16px]  ">{item.phone}</td>
                <td className="w-[143px] h-[56px]  text-[16px]  ">{item.points}</td>
                <td className="w-[143px] h-[56px]  text-[16px]  ">{item.role}</td>
                <td className="w-[143px] h-[56px]  text-[16px]   ">{item.email}</td>
                <td className="w-[143px] h-[56px]  text-[12px]  underline  "><button
                className='bg-three px-2  rounded-4xl py-1'
                onClick={()=>show(item.commissions)}>commission</button></td>
                <td className="w-[143px] h-[56px]  text-[16px]  "> 
                                   <img  className="w-5 h-5"src={item.image===null?`data:image/png;base64,${item.image}`:item.image}/>
                </td>
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

export default Agents
