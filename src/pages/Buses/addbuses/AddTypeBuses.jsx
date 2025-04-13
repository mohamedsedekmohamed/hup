import AddAll from '../../../ui/AddAll'
import picdone from '../../../assets/picdone.svg'
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';
import  FileUploadButton from '../../../ui/FileUploadButton'
import axios from 'axios';
import SwitchButton from '../../../ui/SwitchButton';


const AddTypeBuses = () => {
  const [busImage, setBusImage] = useState(null);
  const [planImage, setPlanImage] = useState(null);
  const [seatsImage, setSeatsImage] = useState(null);
  const [busImageor, setBusImageor] = useState(null);
  const [planImageor, setPlanImageor] = useState(null);
  const [seatsImageor, setSeatsImageor] = useState(null);

    const [name, setName] = useState('');
    const [ Count, setCount] = useState('');
    const [valuee, setValue] = useState("inactive");
    const [edit, setEdit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
 const [errors, setErrors] = useState({
  name: '',
  Count: '',
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
    
    const handleFileChange = (file, type) => {
      if (file) {
        if (type === 'busImage') setBusImage(file);
        if (type === 'planImage') setPlanImage(file);
        if (type === 'seatsImage') setSeatsImage(file);
      }
    };
      useEffect(() => {
            const { snedData } = location.state || {};
            if (snedData) {
              setCount(snedData.seat_count);
              setName(snedData.name);
              if(snedData.bus_image){
                convertImageUrlToBase64(snedData.bus_image)
                .then((base64Flag) => {
                    setBusImage(base64Flag);  
                    setBusImageor(base64Flag); 
                })
                .catch((error) => {
                    console.error("Error converting flag image:", error);
                });
              }
              //
              if(snedData.plan_image){
                convertImageUrlToBase64(snedData.plan_image)
                .then((base64Flag) => {
                    setPlanImage(base64Flag);  
                    setPlanImageor(base64Flag);  
                })
                .catch((error) => {
                    console.error("Error converting flag image:", error);
                });
              }
              //
              if(snedData.seats_image){
                convertImageUrlToBase64(snedData.seats_image)
                .then((base64Flag) => {
                    setSeatsImage(base64Flag);  
                    setSeatsImageor(base64Flag);  
                })
                .catch((error) => {
                    console.error("Error converting flag image:", error);
                });
              }

                setValue(snedData.status);
                setEdit(true);
            }
        }, [location.state]);
    
        const handleChange = (e) => {
          const { name, value } = e.target;
          if (name === 'name') setName(value);
          if (name === 'Count') setCount(value);
        
      };

      const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = 'name is required';
        if (!Count) formErrors.Count = 'Count is required'; 
        if (!busImage && !edit) formErrors.busImage = 'busImage is required'; 
        if (!planImage && !edit) formErrors.planImage = 'planImage is required'; 
        if (!seatsImage && !edit) formErrors.seatsImage = 'seatsImage is required'; 

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
            name: name,
            seat_count: Count,
            status: valuee,
        };
        
if(busImage!=busImageor){
  newUser.bus_image=busImage
}

if(planImage!=planImageor){
  newUser.plan_image=planImage
}

if(seatsImage!=seatsImageor){
  newUser.seats_image=seatsImage
}

        console.log("Data to be sent:", newUser  ); 

        if (edit) {
            const { snedData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/bus_type/update/${snedData.id}`, newUser  , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log('TypeBuses updated successfully:', response.data);
                toast.success('TypeBuses updated  successfully'); 
                                
                                  setTimeout(() => {
                                    navigate('/Buses/TypeBuses');
                                  }, 3000);
                resetForm();

            })
            .catch(error => {
                console.error('Error updating country:', error);
            });
            return;
        }

        axios.post('https://bcknd.ticket-hub.net/api/admin/bus_type/add', newUser  , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log('TypeBuses added successfully:', response.data);
            toast.success('TypeBuses added  successfully'); 

            setTimeout(() => {
              navigate('/Buses/TypeBuses');
            }, 3000);            resetForm();

        })
        .catch(error => {
            console.error('Error adding country:', error);
        });
setValue('inactive')
        setName('');
        setCount('');
        setBusImage(null);
        setPlanImage(null);
        setSeatsImage(null);
        setEdit(false);
    };
    const resetForm = () => {
      setBusImage(null);
      setPlanImage(null);
      setSeatsImage(null);
      setBusImageor(null);
      setPlanImageor(null);
      setSeatsImageor(null);
      setName('');
      setCount('');
      setValue('inactive')
      setEdit(false);
    };
  return (
    <div className='ml-6 flex flex-col mt-6 gap-6'>
      <AddAll navGo='/Buses/TypeBuses' name="Add Type Buses " />
<div className='flex flex-wrap gap-6'>

      <InputField
                placeholder=" Name"
                name="name"
                value={name}
                onChange={handleChange}
            />
              <InputField
                placeholder="seat count"
                name="Count"
                value={Count}
                onChange={handleChange}
            />
               <FileUploadButton
                name="busImage"
                kind="busImage"
                flag={busImage}
                onFileChange={handleFileChange}
              />
                <FileUploadButton
                name="planImage"
                kind="planImage"
                flag={planImage}
                onFileChange={handleFileChange}
            />
              <FileUploadButton
                name="seatsImage"
                flag={seatsImage}
                onFileChange={handleFileChange}
                kind="seatsImage"
                />

<SwitchButton value={valuee} setValue={setValue} />


                </div>
      <button onClick={handleSave}>
                  <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
                  </button>
                  <ToastContainer />
    </div>
  )
}

export default AddTypeBuses;
