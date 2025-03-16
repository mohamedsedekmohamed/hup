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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zone, setZone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const [edit,setEdit] = useState(false);
useEffect(()=>{
  const { snedData } = location.state || {};
if(snedData){
  setName(snedData.name);
  setPhone(snedData.phone);
  setCountry(snedData.country);
  setCity(snedData.city);
  setZone(snedData.zone);
  setEmail(snedData.email);
  setPassword(snedData.password);
  setEdit(true);
}

},[]) 
 const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'phone') setPhone(value);
    if (name === 'country') setCountry(value);
    if (name === 'city') setCity(value);
    if (name === 'zone') setZone(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSave = () => {
    //edit
if(edit){
  const token = localStorage.getItem('token');
  const { snedData } = location.state || {};
  const newUser = {
    name,
    phone,
    country,
    city,
    zone,
    email,
    password,
  };
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
//add
    const token = localStorage.getItem('token');

    const newUser = {
      name,
      phone,
      country,
      city,
      zone,
      email,
      password,  
    };


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
    <div className='ml-6'>
      <AddAll navGo='/User' name="Add User" />
      <div className='flex flex-wrap gap-6 mt-6'>
        <InputField
          placeholder="User"
          name="name"  
          value={name}  
          onChange={handleChange} 
        />
        <InputField
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
        <InputArrow
          placeholder="Country"
          name="country"
          value={country}
          onChange={handleChange}
        />
        <InputArrow
          placeholder="City"
          name="city"
          value={city}
          onChange={handleChange}
        />
        <InputArrow
          placeholder="Zone"
          name="zone"
          value={zone}
          onChange={handleChange}
        />
        <InputArrow
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <InputArrow
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave}>
        <img className='mt-2' src={picdone} alt="Save" />
      </button>
    </div>
  );
};

export default AddUser;
