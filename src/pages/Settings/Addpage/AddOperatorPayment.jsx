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
const AddOperatorPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setname] = useState('');
    const [flag, setFlag] = useState(null);
    const [originalFlag, setOriginalFlag] = useState(null);
    const [valuee, setValue] = useState("inactive");
    const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

    const handleFileChange = (file) => {
        if (file) {
            setFlag(file);
        }
    };
    const [errors, setErrors] = useState({
        name: '',
        flag: '',
    });
 

    useEffect(() => {
        const { snedData } = location.state || {};
        if (snedData) {
            setname(snedData.name);
            setValue(snedData.status);
            setEdit(true);

            if (snedData.image) {
                        setFlag(snedData.image_link);
                        setOriginalFlag(snedData.image_link); // حفظ الصورة الأصلية
             }
        }
        const timeout = setTimeout(() => {
            setLoading(false);
          }, 1000);
      
          return () => clearTimeout(timeout);
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


    if (edit) {
        const { snedData } = location.state || {};
        axios.put(`https://bcknd.ticket-hub.net/api/admin/operator_payment_method/update/${snedData.id}`, newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
             toast.success(' Add Payment Methods updated  successfully'); 
                                setTimeout(() => {
                                  navigate('/Settings/OperatorPayment');
                                }, 3000);
        })
        .catch(() => {
        });
        return;
    }

    // إذا كان هذا إضافة جديدة
    axios.post('https://bcknd.ticket-hub.net/api/admin/operator_payment_method/add', newCountryData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(() => {
        toast.success(' Add Payment Methods added  successfully'); 
        setTimeout(() => {
          navigate('/Settings/OperatorPayment');
        }, 3000);
    })
    .catch(() => {
    });

    setname('');
    setFlag(null);
    setValue('inactive');
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
        <div className='ml-6 flex flex-col mt-6 gap-6'>
        <AddAll navGo='/Settings/OperatorPayment' name="add Operator Payment" />
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
            <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
            </button>
        <ToastContainer />
    </div>
    )

}

export default AddOperatorPayment

