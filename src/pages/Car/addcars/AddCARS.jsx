import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import InputArrow from '../../../ui/InputArrow';
import Inputfiltter from '../../../ui/Inputfiltter';
import FileUploadButton from '../../../ui/FileUploadButton';
import SwitchButton from '../../../ui/SwitchButton';
const AddCARS = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [category, setcategory] = useState('');
    const [flag, setFlag] = useState(null);
    const [brand, setbrand] = useState('')
    const [model, setmodel] = useState('')
    const [agent, setagent] = useState('')
    const [carnumber, setcarnumber] = useState('')
    const [carcolor, setcarcolor] = useState('')
    const [caryear, setcaryear] = useState('')
    const [originalFlag, setOriginalFlag] = useState(null);
    const [edit, setEdit] = useState(false);
    const [valuee, setValue] = useState("inactive");
    const handleFileChange = (file) => {
        if (file) {
            setFlag(file);
        }
    };
    const [errors, setErrors] = useState({
        category: '',
        flag: '',
        brand: '',
        agent: '',
        model: '',
        carnumber: '',
        carcolor: '',
        caryear: '',
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
            setcategory(snedData.category_id);
            setbrand(snedData.brand_id)
            setmodel(snedData.model_id)
            setagent(snedData.agent_id)
            setcarnumber(snedData.car_number)
            setcarcolor(snedData.car_color)
            setcaryear(snedData.car_year)
            setValue(snedData.status);
            setEdit(true);

            setbrand(snedData.brand_id)
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
        if (name === 'car_categories') setcategory(value);
        if (name === 'car_brands') setbrand(value);
        if (name === 'car_models') setmodel(value);
        if (name === 'operators') setagent(value);
        if (name === 'number') setcarnumber(value);
        if (name === 'color') setcarcolor(value);
        if (name === 'year') setcaryear(value);

    };

    const validateForm = () => {
        let formErrors = {};
        if (!category) formErrors.category = 'category is required';
        if (!brand) formErrors.brand = 'brand is required';
        if (!model) formErrors.model = 'model is required';
        if (!agent) formErrors.agent = 'agent is required';
        if (!carnumber) formErrors.carnumber = 'carnumber is required';
        if (!carcolor) formErrors.carcolor = 'carcolor is required';
        if (!caryear) formErrors.caryear = 'caryear is required';
        if (!flag && !edit) formErrors.flag = 'image is required';
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

            status: valuee,
            category_id: category,
            brand_id: brand,
            model_id: model,
            agent_id: agent,
            car_number: carnumber,
            car_color: carcolor,
            car_year: caryear,

        };

        if (flag !== originalFlag) {
            newCountryData.image = flag;
        }

        console.log("Data to be sent:", newCountryData);

        if (edit) {
            const { snedData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/car/update/${snedData.id}`, newCountryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    console.log('car  updated successfully:', response.data);
                    toast.success('car  updated successfully');
                    setTimeout(() => {
                        navigate('/Car/CARS');
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error updating BRANDS:', error);
                    toast.error("network");

                });
            return;
        }

        axios.post('https://bcknd.ticket-hub.net/api/admin/car/add', newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('car  added successfully:', response.data);
                toast.success('car  added  successfully');

                setTimeout(() => {
                    navigate('/Car/CARS');
                }, 3000);
            })
            .catch(error => {
                console.error('Error adding country:', error);
                toast.error("network");

            });

        setcategory('');
        setcarcolor('');
        setcaryear('');
        setcarnumber('');
        setagent('');
        setmodel('');
        setbrand('')
        setFlag(null);
        setValue('inactive');
        setEdit(false);
    };
    return (
        <div className='ml-6 flex flex-col mt-6 gap-6'>
            <AddAll navGo='/Car/MODELS' name="Add MODELS" />
            <div className='flex flex-wrap gap-6'>
            <InputArrow like 
                placeholder="categories"
                name="car_categories"
                value={category}
                onChange={handleChange}
                required
            />
            <Inputfiltter
                like
                placeholder="brands"
                name="car_brands"
                value={brand}
                onChange={handleChange}
                shara={category}
                required
            />
             <Inputfiltter
                like
                placeholder="models"
                name="car_models"
                value={model}
                onChange={handleChange}
                shara={brand}
                required
            />
             <InputArrow like
                placeholder="agent"
                name="operators"
                value={agent}
                onChange={handleChange}
                required
            />
          
            <FileUploadButton
                name="flag"
                kind="flag"
                flag={flag}
                onFileChange={handleFileChange}
            />
 <InputField
      placeholder="color"
      name="color"
      value={carcolor}
      onChange={handleChange}
      required
    />
     <InputField
      placeholder="car number"
      name="number"
      value={carnumber}
      onChange={handleChange}
      required
    />
     <InputField
      placeholder="car year"
      name="year" 
      value={caryear}
      onChange={handleChange}
      required
    />

            <SwitchButton num value={valuee} setValue={setValue} />
            <button onClick={handleSave}>
                <img className="my-6" src={picdone} alt="Save" />
            </button>
            <ToastContainer />
            </div>
        </div>
    )
}

export default AddCARS
