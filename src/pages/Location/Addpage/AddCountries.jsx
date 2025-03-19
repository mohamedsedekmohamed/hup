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

const AddCountries = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [country, setCountry] = useState('');
    const [flag, setFlag] = useState(null);
    const [edit, setEdit] = useState(false);
    const [valuee, setValue] = useState("inactive");

    const handleFileChange = (file) => {
        if (file) {
            setFlag(file); // تحديث العلم فقط إذا تم اختيار ملف جديد
        }
    };

    const [errors, setErrors] = useState({
        country: '',
        flag: '',
    });

    useEffect(() => {
        const { snedData } = location.state || {};
        if (snedData) {
            setCountry(snedData.name);
            setFlag(snedData.flag);
            setValue(snedData.status);
            setEdit(true);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Country') setCountry(value);
    };

    const validateForm = () => {
        let formErrors = {};
        if (!country) formErrors.country = 'Country is required';
        if (!flag && !edit) formErrors.flag = 'Flag is required'; // العلم مطلوب فقط إذا لم تكن في وضع التحرير
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
        
        const newUser   = {
            name: country,
            flag: flag || (edit ? location.state.snedData.flag : null), // الاحتفاظ بالعلم الحالي إذا كنت في وضع التحرير
            status: valuee,
        };

        console.log("Data to be sent:", newUser  ); // تحقق من البيانات المرسلة

        if (edit) {
            const { snedData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/country/update/${snedData.id}`, newUser  , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log('Country updated successfully:', response.data);
                navigate('/Location');
            })
            .catch(error => {
                console.error('Error updating country:', error);
            });
            return;
        }

        axios.post('https://bcknd.ticket-hub.net/api/admin/country/add', newUser  , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log('Country added successfully:', response.data);
            navigate('/Location');
        })
        .catch(error => {
            console.error('Error adding country:', error);
        });

        setCountry('');
        setFlag(null);
        setEdit(false);
    };

    return (
        <div className='ml-6 flex flex-col mt-6 gap-6'>
            <AddAll navGo='/Location' name="Add Country" />
            <InputField
                placeholder="Country Name"
                name="Country"
                value={country}
                onChange={handleChange}
            />
            <FileUploadButton
                name="flag"
                flag={flag}
                onFileChange={handleFileChange}
            />
            <SwitchButton value={valuee} setValue={setValue} />
            <button onClick={handleSave}>
                <img className="my-6" src={picdone} alt="Save" />
            </button>
            <ToastContainer />
        </div>
    );
};

export default AddCountries;