import React, { useEffect, useState } from 'react';
import picdone from '../../assets/picdone.svg';
import AddAll from '../../ui/AddAll';
import InputField from '../../ui/InputField';
import InputArrow from '../../ui/InputArrow';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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

  // Error state to handle validation
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
      setPassword(snedData.password);
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

  // Validation function
  const validateForm = () => {
    let formErrors = {};

    if (!name) formErrors.name = 'Name is required';
    if (!phone) formErrors.phone = 'Phone is required';
    if (!country) formErrors.country = 'Country is required';
    if (!city) formErrors.city = 'City is required';
    if (!zone) formErrors.zone = 'Zone is required';
    if (!email.includes('@gmail.com')) formErrors.email = 'Email should contain @gmail.com';
    if ( password.length < 6) formErrors.password = 'Password must be at least 6 characters';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // If no errors, return true
  };

  const handleSave = () => {
    if (!validateForm()) {
      return; // Don't proceed if form has validation errors
    }

    const token = localStorage.getItem('token');
    const newUser = {
      name,
      phone,
      country_id: country,
      city_id: city,
      zone_id: zone,
      email,
      password,
    };

    if (edit) {
      const { snedData } = location.state || {};
      axios.put(`https://ticket-hub.net/api/admin/user/update/${snedData.id}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('User updated successfully:', response.data);
          navigate('/User');
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
      return;
    }

    axios.post('https://ticket-hub.net/api/admin/user/add', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('User added successfully:', response.data);
        navigate('/User');
      })
      .catch(error => {
        console.error('Error adding user:', error);
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
        <InputArrow
          placeholder="City"
          name="cities"
          value={city}
          onChange={handleChange}
          required
        />
        <InputArrow
          placeholder="Zone"
          name="zones"
          value={zone}
          onChange={handleChange}
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
          <img className="my-6" src={picdone} alt="Save" />
        </button>
        <div className="flex-col gap-3">
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          {errors.country && <p className="text-red-500">{errors.country}</p>}
          {errors.city && <p className="text-red-500">{errors.city}</p>}
          {errors.zone && <p className="text-red-500">{errors.zone}</p>}
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
