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
const AddPaymentMethods = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setname] = useState('');
    const [flag, setFlag] = useState(null);
    const [originalFlag, setOriginalFlag] = useState(null);
    const [valuee, setValue] = useState("inactive");
    const [edit, setEdit] = useState(false);

    const handleFileChange = (file) => {
        if (file) {
            setFlag(file);
        }
    };
    const [errors, setErrors] = useState({
        name: '',
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
            setname(snedData.name);
            setValue(snedData.status);
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
        if (name === 'name') setname(value);
    };

     const validateForm = () => {
            let formErrors = {};
            if (!name) formErrors.name = 'name is required';
            if (!flag && !edit) formErrors.flag = 'Flag is required'; 
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
        status: valuee,
    };

    if (flag && flag !== originalFlag) {
        newCountryData.image= flag;
    }

    console.log("Data to be sent:", newCountryData);

    if (edit) {
        const { snedData } = location.state || {};
        axios.put(`https://bcknd.ticket-hub.net/api/admin/payment_method/update/${snedData.id}`, newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log(' Add Payment Methods updated successfully:', response.data);
             toast.success(' Add Payment Methods updated  successfully'); 
                                setTimeout(() => {
                                  navigate('/Settings/PaymentMethods');
                                }, 3000);
        })
        .catch(error => {
            console.error('Error updating country:', error);
        });
        return;
    }

    // إذا كان هذا إضافة جديدة
    axios.post('https://bcknd.ticket-hub.net/api/admin/payment_method/add', newCountryData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        console.log(' Add Payment Methods add successfully:', response.data);
        toast.success(' Add Payment Methods added  successfully'); 
        setTimeout(() => {
          navigate('/Settings/PaymentMethods');
        }, 3000);
    })
    .catch(error => {
        console.error('Error adding country:', error);
    });

    setname('');
    setFlag(null);
    setValue('inactive');
    setEdit(false);
};

    
    return (
        <div className='ml-6 flex flex-col mt-6 gap-6'>
        <AddAll navGo='/Settings/PaymentMethods' name="add Payment Methods" />
        <InputField
            placeholder=" Name"
            name="name"
            value={name}
            onChange={handleChange}
        />
        <FileUploadButton
            name="flag"
            kind="flag"
            flag={flag}
            onFileChange={handleFileChange}
        />
        <SwitchButton value={valuee} setValue={setValue} />
        <button onClick={handleSave}>
            <img className="my-6" src={picdone} alt="Save" />
        </button>
        <ToastContainer />
    </div>
    )

}

export default AddPaymentMethods
