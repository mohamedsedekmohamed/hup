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
      const [loading, setLoading] = useState(true);
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
                        setFlag(snedData.image);
                        setOriginalFlag(snedData.image); // حفظ الصورة الأصلية
                
            }
        }
        const timeout = setTimeout(() => {
            setLoading(false);
          }, 1000);
      
          return () => clearTimeout(timeout);
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
    
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 h-24 w-24 animate-spin border-orange-500"></div>
      </div>
    );
  }

    return (
        <div className='ml-6 flex flex-col mt-6 gap-6'>
            <AddAll navGo='/Car/CARS' name="Add cars  " />
            <div className='flex flex-wrap gap-6'>
            <InputArrow 
                placeholder="categories"
                name="car_categories"
                value={category}
                onChange={handleChange}
                required
            />
            <Inputfiltter
                placeholder="brands"
                name="car_brands"
                value={brand}
                onChange={handleChange}
                shara={category}
                required
            />
             <Inputfiltter
                
                placeholder="models"
                name="car_models"
                value={model}
                onChange={handleChange}
                shara={brand}
                required
            />
             <InputArrow 
                placeholder="agent"
                name="operators"
                value={agent}
                onChange={handleChange}
                required
            />
                  <div className='flex items-end justify-center'>

            <FileUploadButton
                name="flag"
                kind="flag"
                flag={flag}
                onFileChange={handleFileChange}
            />
            </div>
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

            <SwitchButton avl value={valuee} setValue={setValue} />
            <button onClick={handleSave}>
            <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
            </button>
            <ToastContainer />
            </div>
        </div>
    )
}

export default AddCARS
