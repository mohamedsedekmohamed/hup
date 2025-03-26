import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import FileUploadButton from '../../../ui/FileUploadButton';
import SwitchButton from '../../../ui/SwitchButton';
import Inputfiltter from '../../../ui/Inputfiltter';

const AddBuses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [busNumber, setBusNumber] = useState('');
  const [busType, setBusType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [agent, setAgent] = useState('');
  const [type, setType] = useState('');
  const [pic, setPic] = useState(null);
   const [originalFlag, setOriginalFlag] = useState(null); 
  const [status, setStatus] = useState('inactive');
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({
    busNumber: '',
    pic: '',
    busType: '',
    capacity: '',
    agent: "",
    type: "",
  });
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
        console.error("Error converting image to Base64", error);
      });
  }
  

  const handleFileChange = (file) => {
    if (file) {
      setPic(file);
    }
  };

  // Handling form validation
  const validateForm = () => {
    let formErrors = {};
    if (!busNumber) formErrors.busNumber = 'Bus number is required';
    if (!pic && !edit) formErrors.pic = 'Bus image is required';
    if (!capacity) formErrors.capacity = 'Capacity is required or should write number';
    if (!busType) formErrors.busType = 'Bus type is required';
    if (!agent) formErrors.agent = 'Agent type is required';
    if (!type) formErrors.type = 'Type is required';

    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });
    return Object.keys(formErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if ( name === 'capacity') {
      if (/^\d*$/.test(value)) { 
        setCapacity(value);
      }
    } else {
      if (name === 'busNumber') setBusNumber(value);
      if (name === 'bus_types') setBusType(value);
      if (name === 'type') setType(value);
      if (name === 'agents') setAgent(value);
    }
  };
 
  
  useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setBusNumber(snedData.bus_number);
      setPic(snedData.bus_image);
      setCapacity(snedData.capacity);
      setBusType(snedData.bus_type_id);
      setStatus(snedData.status);
      setType(snedData.type);
      setAgent(snedData.agent_id);
      setEdit(true);
        if (snedData.bus_image) {
          convertImageUrlToBase64(snedData.bus_image)
              .then((base64Flag) => {
                  setPic(base64Flag);  
                  setOriginalFlag(base64Flag); 
              })
              .catch((error) => {
                  console.error("Error converting flag image:", error);
              });
      
    }}
  }, [location.state]);

  const handleSave = () => {
    // Validate before proceeding
    if (!validateForm()) return;

    const newBus = {
      type: type,
      bus_number: busNumber,
      bus_type_id: busType,
      agent_id: agent,
      capacity: capacity,
      status: status,
    };

    if(pic!=originalFlag){
      newBus.bus_image=pic
    }
 
    
    const { snedData } = location.state || {};
    const token = localStorage.getItem('token');

    if (edit && snedData) {
      // Update Bus logic
      axios.put(`https://bcknd.ticket-hub.net/api/admin/bus/update/${snedData.id}`, newBus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('Bus updated successfully:', response.data);
           toast.success('bus updated  successfully'); 
                          
                            setTimeout(() => {
                              navigate('/Buses');
                            }, 3000);
          resetForm();
        })
        .catch(error => {
          console.error('Error updating bus:', error);
        });
    } else {
      // Add Bus logic
      axios.post('https://bcknd.ticket-hub.net/api/admin/bus/add', newBus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('Bus added successfully:', response.data);
          toast.success('bus added  successfully'); 
                          
          setTimeout(() => {
            navigate('/Buses');
          }, 3000);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding bus:', error);
        });
    }
  };

  const resetForm = () => {
    setAgent('');
    setType('');
    setBusNumber('');
    setBusType('');
    setCapacity('');
    setPic(null);
    setStatus('inactive');
    setEdit(false);
  };

  return (
    <>
      <AddAll navGo='/Buses' name="Add Bus" />
    <div className='ml-6 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-6 gap-6'>
      
      <InputField
        placeholder="Bus Number"
        name="busNumber"
        value={busNumber}
        onChange={handleChange}
      />
      <Inputfiltter
        like
        placeholder="Bus Type"
        name="bus_types"
        value={busType}
        onChange={handleChange}
        required
      />
      <Inputfiltter
        like
        placeholder="Agents"
        name="agents"
        value={agent}
        onChange={handleChange}
        required
      />
      <Inputfiltter
        like
        placeholder="Type"
        name="type"
        value={type}
        onChange={handleChange}
        required
      />
      <InputField
        email='number'
        placeholder="Capacity"
        name="capacity"
        value={capacity}
        onChange={handleChange}
      />
      <FileUploadButton
        name="busImage"
        kind="busImage"
        flag={pic}
        onFileChange={handleFileChange}
      />
      <SwitchButton value={status} title='status' setValue={setStatus} />
      <ToastContainer />
    </div>
      <button onClick={handleSave}>
        <img className="my-6 mx-5" src={picdone} alt="Save" />
      </button>
        </>
  );
};

export default AddBuses;
