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
const AddAgents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [originalFlag, setOriginalFlag] = useState(null);
  const [flag, setFlag] = useState(null);

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFileChange = (file) => {
    if (file) {
      setFlag(file);
    }
  };
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    flag: '',
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


  useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setName(snedData.name);
      setEmail(snedData.email);
      setPassword(snedData.password);
      setPhone(snedData.phone);
      setEdit(true);

      if (snedData.image) {
        convertImageUrlToBase64(snedData.image)
          .then((base64Flag) => {
            setFlag(base64Flag);
            setOriginalFlag(base64Flag); // حفظ الصورة الأصلية
          })
          .catch((error) => {
            console.error("Error converting flag image:", error);
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
  };
  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = 'name is required';
    if (!email.includes('@gmail.com')) formErrors.email = 'Email should contain @gmail.com';
    if (!edit) {
      if (password.length < 6) formErrors.password = 'Password must be at least 6 characters';
    }
    if (!phone) {
      formErrors.phone = 'Phone is required';
    } else if (!/^\+?\d+$/.test(phone)) {
      formErrors.phone = 'Phone should contain only numbers or start with a "+"';
    } if (!flag && !edit) formErrors.flag = 'Flag is required';
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
    const newCountryData = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };

    if (flag !== originalFlag) {
      newCountryData.image = flag;
    }

    console.log("Data to be sent:", newCountryData);

    if (edit) {
      const { snedData } = location.state || {};
      axios.put(`https://bcknd.ticket-hub.net/api/admin/operator/update/${snedData.id}`, newCountryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('operator updated successfully:', response.data);
          toast.success('operator updated successfully');
          setTimeout(() => {
            navigate('/Agents');
          }, 3000);
        })
        .catch(error => {
          console.error('Error updating operator:', error);
        });
      return;
    }

    axios.post('https://bcknd.ticket-hub.net/api/admin/operator/add', newCountryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('operator added successfully:', response.data);
        toast.success('operator added  successfully');

        setTimeout(() => {
          navigate('/Agents ');
        }, 3000);
      })
      .catch(error => {
        console.error('Error adding operator:', error);
      });

    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setFlag(null);
    setEdit(false);
  };

  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>

      <AddAll navGo='/Agents' name="add Agents " />
      <div className="flex flex-wrap gap-6 mt-6">
        <InputField
          placeholder="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <InputField
          placeholder="phone"
          name="phone"
          value={phone}
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
        <FileUploadButton
          name="image"
          kind="image"
          flag={flag}
          onFileChange={handleFileChange}
        />
      </div>
      <div className="flex gap-3">
        <button onClick={handleSave}>
          <img className="my-6" src={picdone} alt="Save" />
        </button>


      </div>
      <ToastContainer />


    </div>
  )
}

export default AddAgents
