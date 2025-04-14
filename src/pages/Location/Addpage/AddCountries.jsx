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
    const [originalFlag, setOriginalFlag] = useState(null);
    const [edit, setEdit] = useState(false);
    const [valuee, setValue] = useState("inactive");

    const handleFileChange = (file) => {
        if (file) {
            setFlag(file);
        }
    };

    const [errors, setErrors] = useState({
        country: '',
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
        const { sendData } = location.state || {};
        if (sendData) {
            setCountry(sendData.name);
            setValue(sendData.status);
            setEdit(true);

            if (sendData.flag) {
                convertImageUrlToBase64(sendData.flag)
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
        if (name === 'Country') setCountry(value);
    };

    const validateForm = () => {
        let formErrors = {};
        if (!country) formErrors.country = 'Country is required';
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
            name: country,
            status: valuee,
        };

        if (flag !== originalFlag) {
            newCountryData.flag = flag;
        }

        console.log("Data to be sent:", newCountryData);

        if (edit) {
            const { sendData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/country/update/${sendData.id}`, newCountryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    console.log('Country updated successfully:', response.data);
                    toast.success('Country updated successfully');
                    setTimeout(() => {
                        navigate('/Location');
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error updating country:', error);
                });
            return;
        }

        axios.post('https://bcknd.ticket-hub.net/api/admin/country/add', newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Country added successfully:', response.data);
                toast.success('Country added  successfully');

                setTimeout(() => {
                    navigate('/Location');
                }, 3000);
            })
            .catch(error => {
                console.error('Error adding country:', error);
            });

        // Reset the form for a new entry
        setCountry('');
        setFlag(null);
        setValue('inactive');
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
                kind="flag"
                flag={flag}
                onFileChange={handleFileChange}
            />
            <SwitchButton value={valuee} setValue={setValue} />
            <button onClick={handleSave}>
            <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
            </button>
            <ToastContainer />
        </div>
    );
};

export default AddCountries;