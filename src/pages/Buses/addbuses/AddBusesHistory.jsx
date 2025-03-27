import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
const AddBusesHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name,setname]=useState('')
    const [edit, setEdit] = useState(false);
  
  const [errors, setErrors] = useState({
      name: '',
    });
     const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = ' name is required';
        setErrors(formErrors);
        Object.values(formErrors).forEach((error) => {
          toast.error(error);
        });
        return Object.keys(formErrors).length === 0;
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
      if(name==="name")setname(value)
      }
    

      useEffect(() => {
          const { snedData } = location.state || {};
          if (snedData) {
            setname(snedData.name);
          }
        }, [location.state]); 


        const handleSave = () => {
          // Validate before proceeding
          if (!validateForm()) return;
      
          const newBus = {
            name: name,
            // icon:"اه"          
          }
          
          const { snedData } = location.state || {};
          const token = localStorage.getItem('token');
      
          if (edit && snedData) {
            // Update Bus logic
            axios.put(`https://bcknd.ticket-hub.net/api/admin/aminity/update/${snedData.id}`, newBus, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then(response => {
                console.log('Bus updated successfully:', response.data);
                 toast.success('bus updated  successfully'); 
                                
                                  setTimeout(() => {
                                    navigate('/Buses/BusesHistory');
                                  }, 3000);
              })
              .catch(error => {
                console.error('Error updating bus:', error);
              });
          } else {
            // Add Bus logic
            axios.post('https://bcknd.ticket-hub.net/api/admin/aminity/add', newBus, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then(response => {
                console.log('Bus added successfully:', response.data);
                toast.success('bus added  successfully'); 
                                
                setTimeout(() => {
                  navigate('/Buses/BusesHistory');
                }, 3000);
              })
              .catch(error => {
                console.error('Error adding bus:', error);
              });
          }
          setEdit('')
          setname('')
        };
      
         return (
    <div className='ml-6 flex flex-col mt-6 gap-6'>
    <AddAll navGo='/Buses/BusesHistory' name="Add Aminit "  />
    <InputField
        placeholder="Aminites"
        name="name"
        value={name}
        onChange={handleChange}
      />


  <button onClick={handleSave}>
        <img className="my-6 mx-5" src={picdone} alt="Save" />
      </button>


</div>
  )
}

export default AddBusesHistory
