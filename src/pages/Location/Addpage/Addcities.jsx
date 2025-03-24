import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import InputArrow from '../../../ui/InputArrow';
import SwitchButton from '../../../ui/SwitchButton';

const AddCities = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [edit, setEdit] = useState(false);
  const [valuee, setValue] = useState("inactive");
  const [errors, setErrors] = useState({
    country: '',
    name: '',
  });

  useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setCountry(snedData.country_id);
      setName(snedData.name);
      setValue(snedData.status);
      setEdit(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'countries') setCountry(value);
    if (name === 'name')setName(value);
  };
  
  const validateForm = () => {
    let formErrors = {};
    if (!country) formErrors.country = 'Country is required';
    if (!name) formErrors.flag = 'name is required';
    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });
    return Object.keys(formErrors).length === 0;
  };
  
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    const token = localStorage.getItem('token');

    const newUser = {
      name: name,
      country_id: country,
      status: valuee,
    };

    console.log("Data to be sent:", newUser);

    if (edit) {
      const { snedData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/city/update/${snedData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('city updated successfully:', response.data);
          toast.success('city updated successfully'); 
                    setTimeout(() => {
                      navigate('/Location/Cities');
                    }, 3000);
        })
        .catch(error => {
          console.error('Error updating country:', error);
        });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/city/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('city added successfully:', response.data);
                toast.success('city added  successfully'); 
              
                setTimeout(() => {
                  navigate('/Location/Cities');
                }, 3000);
      })
      .catch(error => {
        console.error('Error adding country:', error);
      });

    setCountry('');
    setName('');
    setEdit(false);
  };






  return (


    <div className='ml-6 flex flex-col mt-6 gap-6'>
      <AddAll navGo='/Location/Cities' name="Add Citiy" />
      <InputArrow like
        placeholder="Country"
        name="countries"
        value={country}
        onChange={handleChange}
        required
      />
      
      <InputField
        placeholder="city"
        name="name"
        value={name}
        onChange={handleChange}
        required
      />
    
      <SwitchButton value={valuee} setValue={setValue} />
      <button onClick={handleSave}>
        <img className="my-6" src={picdone} alt="Save" />
      </button>
      <ToastContainer />
    </div>
  )
}

export default AddCities
