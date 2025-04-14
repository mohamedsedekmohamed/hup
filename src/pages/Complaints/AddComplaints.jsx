import React, { useEffect, useState } from 'react';
import AddAll from '../../ui/AddAll';
import picdone from '../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import InputArrow from '../../ui/InputArrow';
import InputField from '../../ui/InputField';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';

const AddComplaints = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setuser] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setmessage] = useState('');
  const [data, setdata] = useState();
  const [edit, setEdit] = useState(false);

  const [errors, setErrors] = useState({
    user: '',
    subject: '',
    message: '',
    data: '',
  });

  
  const handleDateChange = (newData) => {
    if (newData) {
      const day = newData.getDate() + 1;
      const month = newData.getMonth() + 1;
      const year = newData.getFullYear();

      const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      setdata(formattedDate);
    } else {
      setdata("");
    }
  };


  useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setuser(snedData.user_id);
      setsubject(snedData.subject_id);
      setmessage(snedData.message);
      setdata(snedData.date);
      setEdit(true);
    }
  }, [location.state]);

 


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'users') setuser(value);
    if (name === 'subject') setsubject(value);
    if (name === 'message') setmessage(value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!user) formErrors.user = 'user is required';
    if (!subject) formErrors.subject = 'subject is required';
    if (!message) formErrors.message = 'message is required';
    // if (!data) formErrors.date = 'data is required';
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
      user_id: user || null,
      subject_id: 1,
      date: data,
      message: message,
    };

    console.log('Data to be sent:', newUser);

    if (edit) {
      const { snedData } = location.state || {};
      axios
        .put(`https://bcknd.ticket-hub.net/api/admin/station/update/${snedData.id}`, newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('Complaints updated successfully:', response.data);
             toast.success('Complaints updated successfully');
                              setTimeout(() => {
                                  navigate('/Complaints');
                              }, 3000);
        })
        .catch((error) => {
          toast.error('Error updating country:', error)

          console.error('Error updating country:', error);
        });
      return;
    }

    axios
      .post('https://bcknd.ticket-hub.net/api/admin/complaint/add', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Complaints added successfully:', response.data);
        toast.success('Complaints updated successfully');
        setTimeout(() => {
                              navigate('/Complaints');
                            }, 3000);
      })
      .catch((error) => {
        console.error('Error adding Complaints:', error);
        toast.error('Error adding Complaints:', error)
      });
    console.log('data will send');
    console.log(newUser);

    setuser('');
    setdata('');
    setmessage('');
    setsubject('');
    setEdit(false);
  };

  return (
    <div className="ml-6 flex flex-col mt-6 gap-6">
      <AddAll navGo="/Complaints" name="add Complaints " />
      <div className="flex flex-wrap gap-6 mt-6">
        <InputArrow
          placeholder="user"
          name="users"
          value={user}
          onChange={handleChange}
          required
        />
        <InputField onChange={handleChange} name="subject" value={subject} placeholder="subject " />
        <InputField onChange={handleChange} name="message" value={message} placeholder="message " />
<div className="flex items-end ">
  
          <div className=' flex  justify-between items-center w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-0 md:pl-10'>
                <span className='text-[12px] md:text-[16px]'>date</span>
                  <DatePicker
                    onChange={handleDateChange}
                    value={data}
                    format="dd-MM-yyyy"
                    disableClock={true}
                    disableCalendar={false}
                  />
                </div>
      </div>
      </div>

      <button onClick={handleSave}>
            <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
            </button>
      <ToastContainer />
    </div>
  );
};

export default AddComplaints;
