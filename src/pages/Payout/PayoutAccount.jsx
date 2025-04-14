import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci"; // Import search icon for UI
import NavPayoutAccount from './NavPayoutAccount.jsx'
import Swal from 'sweetalert2';

import ThreeThing from '../../component/ThreeThing.jsx';
import { ToastContainer, toast } from 'react-toastify';
const PayoutAccount = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedFilter, setSelectedFilter] = useState(''); // Track selected filter option

  useEffect(() => {
    const token = localStorage.getItem('token');

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
      .put(`https://bcknd.ticket-hub.net/api/admin/payoutRequest/confirm/${id}`, {}, {
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

        toast.error(error.response.data.message )
      });
  }
  const filteredData = data.filter((item) => {
    if (selectedFilter === "Filter") {
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
  const cheose = ["Filter", "amount", "date", "currency", "agent", "status"]
  const labelMap = {
    Filter: "Filter",
    amount: "amount",
    date: "date",
    agent: "agent",
    currency: "currency",
    status: "status"
  };
  const handelcancel = (id, one) => {
    const token = localStorage.getItem('token');

    Swal.fire({
      title: `Are you sure you want to cancel ${one} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`https://bcknd.ticket-hub.net/api/admin/payoutRequest/cancel/${id}`, {}, {
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
      <NavPayoutAccount />

      <div>

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
          <ThreeThing navGo='/AddCurrency' liked like
            labelMap={labelMap}
            cheose={cheose} // Pass the cheose array to ThreeThing component
            selectedFilter={selectedFilter} // Pass selectedFilter to TheeThing component
            setSelectedFilter={setSelectedFilter} // Function to update selectedFilter
          />
        </div>
        <div className="mt-10 ml-5 hidden lg:block">
        <table className="w-full border-y border-x border-black ">
        <thead className="w-full">
              <tr className='bg-four w-[1012px] h-[56px]' >
                <th className="w-[158px] h-[56px]  text-[12px] border-b text-left pl-3"> date</th>
                <th className="w-[158px] h-[56px]  text-[12px] border-b text-left"> amount</th>
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">currency</th>
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">agent</th>
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">email</th>
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">phone</th>
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left"> method</th>
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-left">Status</th>
                <th className="w-[158px] h-[56px]  text-[12px]  border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>

              {filteredData.map((item, index) => (
                <tr key={index} className='border-y hover:border-y-3 relative hover:bg-six'>
                  <td className="w-[143px] h-[56px]  text-[12px] px-2 ">{item.date}</td>
                  <td className="w-[158px]   h-[56px]  text-[12px]  ">{item.amount}</td>
                  <td className="w-[158px]  h-[56px]  text-[12px]  ">{item.currency.name}{item.currency.symbol}</td>
                  <td className="w-[158px]   h-[56px]  text-[12px] ">{item.agent.name}</td>
                  <td className="w-[158px]   h-[56px]  text-[12px] ">{item.agent.email}</td>
                  <td className="w-[158px]   h-[56px]  text-[12px] ">{item.agent.phone}</td>
                  <td className="w-[158px]  h-[56px]  text-[12px]  ">{item.payment_method?.name}
                    <img src={item.payment_method?.image_link} className='w-5 h-5'/></td>
                 <td className=" w-[158px]    h-[56px]  text-[16px]  text-nine  font-normal  rounded-[8px]">{item.status}</td>
                  {item.status !== 'canceled' ? (
                    <td className="w-[158px]    flex gap-1 justify-center items-center h-12  ">
                    <button onClick={() => handlecancel(item.id,item.agent.name)} className='bg-three py-1 px-2 rounded-[8px] text-white'>
                      confirm
                    </button>
                    <button className='bg-three py-1 px-2 rounded-[8px] text-white' onClick={() => handelcancel(item.id,item.agent.name)}>cancel</button>
                  </td>) : (
                    <td></td>
                  )}
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      
      <div className="mt-10 ml-5 lg:hidden">
        <div className='w-[95%] bg-six'>
          {filteredData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 p-3'>
              <div className="flex gap-4">
                <strong>date:</strong>
                <span>{item.date}</span>
              </div>
              <div className="flex gap-4">
                <strong>amount:</strong>
                <span>{item.amount}</span>
              </div>
              <div className="flex gap-4">
                <strong>currency:</strong>
                <span>{item.currency.name}{item.currency.symbol}</span>
              </div>
              <div className="flex gap-4">
                <strong>agent:</strong>
                <span>{item.agent.name}</span>
              </div>
              <div className="flex gap-4">
                <strong>email:</strong>
                <span>{item.agent.email}</span>
              </div>
              <div className="flex gap-4">
                <strong>phone:</strong>
                <span>{item.agent.phone}</span>
              </div>
              <div className="flex gap-4">
                <strong>Status:</strong>
                <span className="bg-eight font-normal p-1 rounded-[8px] text-nine">{item.status}</span>
              </div>
              <div className="flex gap-4">
                <strong>method:</strong>

                <img 
                  className="w-5 h-5"
                  src={item.payment_method?.image_link === null ? `data:image/png;base64,${item.payment_method?.image_link}` :item.payment_method?.image_link}
            
                /><span>{item.payment_method?.name}</span>
              </div>
              <div className='flex'>
              {item.status !== 'canceled' ? (
                    <td className="w-[158px]    flex gap-1 justify-center items-center h-12  ">
                    <button onClick={() => handlecancel(item.id,item.agent.name)} className='bg-three py-1 px-2 rounded-[8px] text-white'>
                      confirm
                    </button>
                    <button className='bg-three py-1 px-2 rounded-[8px] text-white' onClick={() => handelcancel(item.id,item.agent.name)}>cancel</button>
                  </td>) : (
                    <td></td>
                  )}
              </div>
              <div className='w-full bg-white h-2'></div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />

    </div>
  )
}

export default PayoutAccount
