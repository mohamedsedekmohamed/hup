 import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import SwitchButton from '../../../ui/SwitchButton';
import  FileUploadButton from '../../../ui/FileUploadButton'

const AddBusesHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setname] = useState('')
  const [edit, setEdit] = useState(false);
  const [valuee, setValue] = useState("inactive");
  const [icon, seticon] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    icon: ''
  });
  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = ' Aminit is required';
    setErrors(formErrors);
    Object.values(formErrors).forEach((error) => {
      toast.error(error);
    });
    return Object.keys(formErrors).length === 0;
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
        console.error("Error converting image to Base64", error);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setname(value)
  }


  useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setname(snedData.name);
      if(snedData.icon_link){
        convertImageUrlToBase64(snedData.icon_link)
        .then((base64Flag) => {
          seticon(base64Flag);  
          seticon(base64Flag); 
        })
        .catch((error) => {
            console.error("Error converting flag image:", error);
        });
      }      setValue(snedData.status);
    }
  }, [location.state]);


  const handleSave = () => {
    // Validate before proceeding
    if (!validateForm()) return;

    const newBus = {
      name: name,
      icon: icon,
      status:valuee,
    }
    if(icon!=icon){
      newBus.icon_link=icon
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
          toast.success('Aminit updated  successfully');

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
          console.log('Aminit added successfully:', response.data);
          toast.success('Aminit added  successfully');

          setTimeout(() => {
            navigate('/Buses/BusesHistory');
          }, 3000);
        })
        .catch(error => {
          console.error('Error adding bus:', error);
        });
    }
    setEdit('')
    setValue('0')
    seticon(null)
    setname('')
  };
  const handleFileChange = (file, type) => {
    if (file) {
      if (type === 'icon') seticon(file);

    }
  };
  return (
    <div className='ml-6 flex flex-col mt-6 gap-6'>
      <AddAll navGo='/Buses/BusesHistory' name="Add Aminit " />
      <InputField
        placeholder="Aminites"
        name="name"
        value={name}
        onChange={handleChange}
      />
        <FileUploadButton
                name="icon"
                kind="icon"
                flag={icon}
                onFileChange={handleFileChange}
            />

<SwitchButton value={valuee} setValue={setValue} />

<button onClick={handleSave}>
            <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
            </button>
      <ToastContainer />

    </div>
  )
}

export default AddBusesHistory
