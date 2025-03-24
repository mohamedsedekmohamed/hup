import React, {  useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputArrow from '../../../ui/InputArrow'
import InputField from '../../../ui/InputField'
import Inputfiltter from '../../../ui/Inputfiltter'
import SwitchButton from '../../../ui/SwitchButton';

const Addzones= () => {
      const navigate = useNavigate();
      const location = useLocation();
      const [country, setCountry] = useState('');
      const [city, setCity] = useState('');
      const [name, setName] = useState('');
      const [valuee, setValue] = useState("inactive");
      const [edit, setEdit] = useState(false);
      const [errors, setErrors] = useState({
        country: '',
        city:"",
        name: '',
      });


 useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setCountry(snedData.country_id);
      setCity(snedData.city_id);
      setName(snedData.name);
      setValue(snedData.status);
      setEdit(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'countries') setCountry(value);
    if (name === 'zones')setName(value);
    if (name === 'cities')setCity(value);
  };

  const validateForm = () => {
      let formErrors = {};
      if (!country) formErrors.country = 'Country is required';
      if (!name) formErrors.name = 'name is required';
      if (!city) formErrors.city = 'city is required';
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
        city_id: city,
        status: valuee,
      };
  
      console.log("Data to be sent:", newUser);
  
      if (edit) {
        const { snedData } = location.state || {};
        axios.put(`https://bcknd.ticket-hub.net/api/admin/zone/update/${snedData.id}`, newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => {
            console.log('zone updated successfully:', response.data);
             toast.success('zone added  successfully'); 
                  
                    setTimeout(() => {
                      navigate('/Location/Zones');
                    }, 3000);
          })
          .catch(error => {
            console.error('Error updating country:', error);
          });
        return;
      }
  
      axios.post('https://bcknd.ticket-hub.net/api/admin/zone/add', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('zone added successfully:', response.data);
           toast.success('zone added  successfully'); 
                
                  setTimeout(() => {
                    navigate('/Location/Zones');
                  }, 3000);
        })
        .catch(error => {
          console.error('Error adding country:', error);
        });
  
      setCountry('');
      setName('');
      setCity('');
      setEdit(false);
    };
  
  return (
    <div className='ml-6 flex flex-col mt-6 gap-6'>
    <AddAll navGo='/Location/Zones' name="Add zone" />
    <InputArrow like
      placeholder="Country"
      name="countries"
      value={country}
      onChange={handleChange}
      required
    />
  <Inputfiltter
  like
  placeholder="city"
  name="cities"
  value={city}
  onChange={handleChange}
  shara={country}
  required
/>
    
    <InputField
      placeholder="zones"
      name="zones"
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

export default Addzones
