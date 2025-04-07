import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AddAll from '../../ui/AddAll'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
const AddCommission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [train, settrain] = useState('');
  const [bus, setbus] = useState('');
  const [hiace, sethiace] = useState('');
  const [id, setId] = useState('');
  const [errors, setErrors] = useState({
    train: '',
    bus: '',
    hiace: ''
  })
  useEffect(() => {

    const token = localStorage.getItem('token');

    axios.get("https://bcknd.ticket-hub.net/api/admin/defaultCommission ", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        settrain(response.data.default_commission.train);
        setbus(response.data.default_commission.bus);
        sethiace(response.data.default_commission.hiace);
        setId(response.data.default_commission.id);
      })
      .catch(error => {
        console.log(token);
        console.error('Error fetching data:', error);
      });

  }, [location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'train') settrain(value);
    if (name === 'bus') setbus(value);
    if (name === 'hiace') sethiace(value);
  };


  const validateForm = () => {
    let formErrors = {};

    if (!train) formErrors.name = 'train is required';
    if (!bus) formErrors.name = 'bus is required';
    if (!hiace) formErrors.name = 'hiace is required';


    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem('token');
    const newUser = {
      train,
      bus,
      hiace
    };
    if()
    axios.put(`https://bcknd.ticket-hub.net/api/admin/defaultCommission/update/${id}`, newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Commission updated successfully:', response.data);
        toast.success('Commission updated successfully');
        setTimeout(() => {
          navigate('/Commission');
        }, 3000);
      })
      .catch(error => {
        console.error('Error updating Commission:', error);
      });
    settrain('');
    sethiace('');
    setbus('');

  };

  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>

      <AddAll navGo='/Commission' name="add Commission " />
      <div className='flex flex-wrap gap-6  mt-6'>

        <InputField name="train" placeholder="train" value={train}
          onChange={handleChange} />
        <InputField name="bus" placeholder="bus" value={bus}
          onChange={handleChange} />
        <InputField name="hiace" placeholder="hiace" value={hiace}
          onChange={handleChange} />
      </div>

      <div className="flex gap-3">
        <button onClick={handleSave}>
          <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
        </button>

      </div>          <ToastContainer />

    </div>
  )
}

export default AddCommission
