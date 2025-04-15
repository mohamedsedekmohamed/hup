import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';

const AddTraintype = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState('');
    const [edit, setEdit] = useState(false);

    const [errors, setErrors] = useState({
        name: '',
    });
    useEffect(() => {
        const { snedData } = location.state || {};
        if (snedData) {
            setName(snedData.name);
            setEdit(true);

        }
    }
        , [location.state]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
    };
    const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.country = 'name is required';
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
        }

        console.log("Data to be sent:", newCountryData);

        if (edit) {
            const { snedData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/trainType/update/${snedData.id}`, newCountryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    toast.success('type updated successfully');
                    setTimeout(() => {
                        navigate('/Train');
                    }, 3000);
                })
                .catch(() => {
                });
            return;
        }

        axios.post('https://bcknd.ticket-hub.net/api/admin/trainType/add', newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                toast.success('type added  successfully');

                setTimeout(() => {
                    navigate('/Train');
                }, 3000);
            })
            .catch(() => {
            });

        setName('');
        setEdit(false);

    };

    return (
        <div className='ml-6 flex flex-col mt-6 gap-6'>
            <AddAll navGo='/Train' name="Add  train type  " />
            <InputField
                placeholder="type Name"
                name="name"
                value={name}
                onChange={handleChange}
            />

          <button onClick={handleSave}>
                      <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
                      </button>
            <ToastContainer />
        </div>
    )
}

export default AddTraintype
