import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';

const AddNationality = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setname] = useState('');
    const [edit, setEdit] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
    });
    useEffect(() => {
        const { snedData } = location.state || {};
        if (snedData) {
            setname(snedData.name);
            setEdit(true);
        }
    }, [location.state]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setname(value);
    };
    const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = 'name is required';
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
        };

     

        console.log("Data to be sent:", newCountryData);

        if (edit) {
            const { snedData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/nationality/update/${snedData.id}`, newCountryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    console.log('nationality updated successfully:', response.data);
                    toast.success('nationality updated  successfully');
                    setTimeout(() => {
                        navigate('/Settings/Nationality');
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error updating nationality:', error);
                });
            return;
        }

        axios.post('https://bcknd.ticket-hub.net/api/admin/nationality/add', newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(' nationalityadd successfully:', response.data);
                toast.success('nationality added  successfully');
                setTimeout(() => {
                    navigate('/Settings/Nationality');
                }, 3000);
            })
            .catch(error => {
                console.error('Error adding nationality:', error);
            });

        setname('');
    
        setEdit(false);
    };

    return (
        <div className='ml-6 flex flex-col mt-6 gap-6'>
  <AddAll navGo='/Settings/Nationality' name="add Nationality " />
        <InputField
            placeholder=" Nationality"
            name="name"
            value={name}
            onChange={handleChange}
        />
         <button onClick={handleSave}>
                    <img className="my-6" src={picdone} alt="Save" />
                </button>
                <ToastContainer />
        </div>
    )
}

export default AddNationality
