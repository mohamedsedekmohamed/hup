import React, { useEffect, useState } from 'react';
import AddAll from '../../ui/AddAll';
import picdone from '../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../ui/InputField';
import FileUploadButton from '../../ui/FileUploadButton';
import SwitchButton from '../../ui/SwitchButton';
import Inputfiltter from '../../ui/Inputfiltter';

const Addhiace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [busNumber, setBusNumber] = useState('');
  // const [busType, setBusType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [agent, setAgent] = useState('');
  const [pic, setPic] = useState(null);
  const [originalFlag, setOriginalFlag] = useState(null);
  const [status, setStatus] = useState('inactive');
  const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
  
  const [errors, setErrors] = useState({
    busNumber: '',
    pic: '',
    // busType: '',
    capacity: '',
    agent: "",
    type: "",
  });

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
    // if (!busType) formErrors.busType = 'Bus type is required';
    if (!agent) formErrors.agent = 'Agent type is required';

    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'capacity') {
      if (/^\d*$/.test(value)) {
        setCapacity(value);
      }
    } else {
      if (name === 'busNumber') setBusNumber(value);
      // if (name === 'bus_types') setBusType(value);
      if (name === 'agents') setAgent(value);
    }
  };


  useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setBusNumber(snedData.bus_number);
      setPic(snedData.bus_image);
      setCapacity(snedData.capacity);
      // setBusType(snedData.bus_type_id);
      setStatus(snedData.status);
      setAgent(snedData.agent_id);
      setEdit(true);
      if (snedData.bus_image) {
            setPic(snedData.bus_image);
            setOriginalFlag(snedData.bus_image);
      

      }
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.state]);

  const handleSave = () => {
    if (!validateForm()) return;

    const newBus = {
      type: "hiace",
      bus_number: busNumber,
      bus_type_id:null,
      agent_id: agent,
      capacity: capacity,
      status: status,
    };

    if (pic != originalFlag) {
      newBus.bus_image = pic
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
        .then(() => {
          toast.success('bus updated  successfully');

          setTimeout(() => {
            navigate('/Hiace');
          }, 3000);
          resetForm();
        })
        .catch(() => {
        });
    } else {
      // Add Bus logic
      axios.post('https://bcknd.ticket-hub.net/api/admin/bus/add', newBus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          toast.success('bus added  successfully');

          setTimeout(() => {
            navigate('/Hiace');
          }, 3000);
          resetForm();
        })
        .catch(() => {
        });
    }
  };

  const resetForm = () => {
    setAgent('');
    setBusNumber('');
    // setBusType('');
    setCapacity('');
    setPic(null);
    setStatus('inactive');
    setEdit(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 h-24 w-24 animate-spin border-orange-500"></div>
      </div>
    );
  }

  return (
<div>

      <AddAll navGo='/Hiace' name="Add Hiace" />
      <div className='ml-6 flex flex-wrap mt-6 gap-6'>

        <InputField
          placeholder="hiace Number"
          name="busNumber"
          value={busNumber}
          onChange={handleChange}
        />
        {/* <Inputfiltter
          like
          placeholder="hiace Type"
          name="bus_types"
          value={busType}
          onChange={handleChange}
          required
        /> */}
        <Inputfiltter
          like
          placeholder="Agents"
          name="agents"
          value={agent}
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
                <div className='flex items-end justify-center'>

        <FileUploadButton
          name="busImage"
          kind="busImage"
          flag={pic}
          onFileChange={handleFileChange}
        />
        </div>
        <SwitchButton value={status} title='status' setValue={setStatus} />
        <ToastContainer />
      </div>
      <button className='mt-6 ml-6' onClick={handleSave}>
        <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
      </button>
        
      </div>

  );
};

export default Addhiace ;
