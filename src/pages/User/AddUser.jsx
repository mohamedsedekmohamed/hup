import React, { useEffect, useState } from 'react';
import picdone from '../../assets/picdone.svg';
import AddAll from '../../ui/AddAll';
import InputField from '../../ui/InputField';
import InputArrow from '../../ui/InputArrow';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Inputfiltter from '../../ui/Inputfiltter';
const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zone, setZone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edit, setEdit] = useState(false);


  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    country: '',
    city: '',
    zone: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setName(snedData.name);
      setPhone(snedData.phone);
      setCountry(snedData.country_id);
      setCity(snedData.city_id);
      setZone(snedData.zone_id);
      setEmail(snedData.email);
      setEdit(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'phone') setPhone(value);
    if (name === 'countries') setCountry(value);
    if (name === 'cities') setCity(value);
    if (name === 'zones') setZone(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const validateForm = () => {
    let formErrors = {};

    if (!name) formErrors.name = 'Name is required';
    if (!phone) {
      formErrors.phone = 'Phone is required';
    } else if (!/^\+?\d+$/.test(phone)) { 
      formErrors.phone = 'Phone should contain only numbers or start with a "+"';
    }
    if (!country) formErrors.country = 'Country is required';
    if (!city) formErrors.city = 'City is required';
    if (!zone) formErrors.zone = 'Zone is required';
    if (!email.includes('@gmail.com')) formErrors.email = 'Email should contain @gmail.com';
    if(!edit){
      if (password.length < 6) formErrors.password = 'Password must be at least 6 characters';
    } 

    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });

    // Update errors state
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return; 
    }

    const token = localStorage.getItem('token');
    const newUser = {
      name,
      phone,
      country_id: country,
      city_id: city,
      zone_id: zone,
      email,
      
    };
    if(!edit) {newUser.password=password}
    

    if (edit) {
      const { snedData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/user/update/${snedData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('User updated successfully'); 
          setTimeout(() => {
            navigate('/User');
          }, 3000);
        })
        .catch(()=> {
          toast.error("failed network");
        });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/user/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('User added  successfully'); 
      
        setTimeout(() => {
          navigate('/User');
        }, 3000);
      })
      .catch(() => {
        toast.error("failed network");
      });

    setName('');
    setPhone('');
    setCountry('');
    setCity('');
    setZone('');
    setEmail('');
    setPassword('');
    setEdit(false);
  };

  return (
    <div className="ml-6">
      <AddAll navGo="/User" name="Add User" />
      <div className="flex flex-wrap gap-6 mt-6">
        <InputField
          placeholder="User"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <InputField
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={handleChange}
          required
        />
        <InputArrow
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
        <Inputfiltter
          like
          placeholder="zone"
          name="zones"
          value={zone}
          onChange={handleChange}
          shara={city}
          required
        />
        <InputField
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <InputField
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex gap-3">
        <button onClick={handleSave}>
          <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
        </button>
      
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
