import React, { useEffect, useState } from 'react';
import AddAll from '../../ui/AddAll';
import picdone from '../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../ui/InputField';
import FileUploadButton from '../../ui/FileUploadButton';

const AddAgents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [originalFlag, setOriginalFlag] = useState(null);
  const [flag, setFlag] = useState(null);
  const [description, setDescription] = useState('');
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [trainCommission, setTrainCommission] = useState('default');
  const [busCommission, setBusCommission] = useState('default');
  const [hiaceCommission, setHiaceCommission] = useState('default');
  const [commissionType, setCommissionType] = useState('defult');

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    flag: '',
    description: '',
  });

  const handleFileChange = (file) => {
    if (file) {
      setFlag(file);
    }
  };

  function convertImageUrlToBase64(url) {
    return fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      })
      .catch((error) => {
        console.error('Error converting image to Base64', error);
      });
  }

  useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setName(snedData.name);
      setDescription(snedData.description);
      setEmail(snedData.email);
      setPassword(snedData.password);
      setPhone(snedData.phone);
      setEdit(true);

      if (snedData.image) {
        convertImageUrlToBase64(snedData.image)
          .then((base64Flag) => {
            setFlag(base64Flag);
            setOriginalFlag(base64Flag);
          })
          .catch((error) => {
            console.error('Error converting flag image:', error);
          });
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'phone') setPhone(value);
    if (name === 'description') setDescription(value);
    if (name === 'trainCommission') setTrainCommission(value);
    if (name === 'busCommission') setBusCommission(value);
    if (name === 'hiaceCommission') setHiaceCommission(value);
  };

  const handleCommissionTypeChange = (e) => {
    const { value } = e.target;
    setCommissionType(value);

    if (value === 'defult') {
      setTrainCommission('default');
      setBusCommission('default');
      setHiaceCommission('default');
    }
    if (value === 'private') {
      setTrainCommission('');
      setBusCommission('');
      setHiaceCommission('');
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = 'name is required';
    if (!description) formErrors.description = 'description is required';
    if (!email.includes('@gmail.com')) formErrors.email = 'Email should contain @gmail.com';
    if (!edit && password.length < 6) formErrors.password = 'Password must be at least 6 characters';
    
    if (commissionType === 'private') {
      if (!trainCommission) formErrors.trainCommission = 'Train commission is required';
      else if (isNaN(trainCommission)) formErrors.trainCommission = 'Train commission must be a number';

      if (!busCommission) formErrors.busCommission = 'Bus commission is required';
      else if (isNaN(busCommission)) formErrors.busCommission = 'Bus commission must be a number';

      if (!hiaceCommission) formErrors.hiaceCommission = 'Hiace commission is required';
      else if (isNaN(hiaceCommission)) formErrors.hiaceCommission = 'Hiace commission must be a number';
  }    if (!phone) formErrors.phone = 'Phone is required';
    else if (!/^\+?\d+$/.test(phone)) formErrors.phone = 'Phone should contain only numbers or start with a "+"';
    if (!flag && !edit) formErrors.flag = 'Flag is required';
    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    const newCountryData = {
      name,
      email,
      password,
      phone,
      description,
      commission_type:commissionType,
    };
    if(commissionType=== 'private') {
      newCountryData.hiace_commission = hiaceCommission;
      newCountryData.train_commission = trainCommission;
      newCountryData.bus_commission = busCommission;
    }
    if (flag !== originalFlag) {
      newCountryData.image = flag;
    }

    console.log('Data to be sent:', newCountryData);

    if (edit) {
      const { snedData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/operator/update/${snedData.id}`, newCountryData, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          console.log('operator updated successfully:', response.data);
          toast.success('operator updated successfully');
          setTimeout(() => navigate('/Agents'), 3000);
        })
        .catch((error) => console.error('Error updating operator:', error));
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/operator/add', newCountryData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        console.log('operator added successfully:', response.data);
        toast.success('operator added successfully');
        setTimeout(() => navigate('/Agents'), 3000);
      })
      .catch(error => {
        toast.error(error);
        console.error('Error adding operator:', error);
      });

    // Reset form
    setDescription('');
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setFlag(null);
    setEdit(false);
  };

  return (
    <div className='ml-6 flex flex-col mt-6 gap-6'>
      <AddAll navGo='/Agents' name="Add Agents" />
      <div className="flex flex-wrap gap-6 mt-6">
        <InputField placeholder="Name" name="name" value={name} onChange={handleChange} required />
        <InputField placeholder="Description" name="description" value={description} onChange={handleChange} required />
        <InputField placeholder="Phone" name="phone" value={phone} onChange={handleChange} required />
        <InputField placeholder="Email" name="email" value={email} onChange={handleChange} required />
        <InputField placeholder="Password" name="password" value={password} onChange={handleChange} required />
        <FileUploadButton name="image" kind="image" flag={flag} onFileChange={handleFileChange} />

        <div className='flex flex-col gap-1 justify-center items-center'>
        <label>Commission Type </label>       
           <select 
            className='w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10' 
            value={commissionType} 
            onChange={handleCommissionTypeChange}
          >
            <option value="defult">Default</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className='flex flex-col gap-1 justify-center items-center'>
          <label>Commission Train:</label>
          {commissionType && (
            <InputField
              placeholder="Train Commission"
              name="trainCommission"
              value={trainCommission}
              onChange={handleChange}
              disabled={commissionType !== 'private'}
            />
          )}
        </div>
        
        <div className='flex flex-col gap-1 justify-center items-center'>
          <label>Commission Bus: </label>
          {commissionType && (
            <InputField
              placeholder="Bus Commission"
              name="busCommission"
              value={busCommission}
              onChange={handleChange}
              disabled={commissionType !== 'private'}
            />
          )}
        </div>

        <div className='flex flex-col gap-1 justify-center items-center'>
          <label>Commission Hiace: </label>
          {commissionType && (
            <InputField
              placeholder="Hiace Commission"
              name="hiaceCommission"
              value={hiaceCommission}
              onChange={handleChange}
              disabled={commissionType !== 'private'}
            />
          )}
        </div>

      </div>

      <div className="flex gap-3">
        <button onClick={handleSave}>
          <img className="my-6" src={picdone} alt="Save" />
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddAgents;
