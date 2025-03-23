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

    const handleFileChange = (base64String, kind) => {
      if (kind === 'busImage') {
        setBusImage(base64String);
      } else if (kind === 'planImage') {
        setPlanImage(base64String);
      } else if (kind === 'seatsImage') {
        setSeatsImage(base64String);
      }
    };
  
      useEffect(() => {
            const { snedData } = location.state || {};
            if (snedData) {
              setCount(snedData.name);
              setName(snedData.flag);
              // setBusImage(snedData)
              // setPlanImage(snedData)
              // setSeatsImage(snedData)
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
        if (!busImage) formErrors.busImage = 'busImage is required'; 
        if (!planImage) formErrors.planImage = 'planImage is required'; 
        if (!seatsImage) formErrors.seatsImage = 'seatsImage is required'; 

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
            bus_image: busImage || (edit ? location.state.snedData.busImage : null), 
            plan_image: planImage || (edit ? location.state.snedData.planImage : null), 
            seats_image: seatsImage || (edit ? location.state.snedData.seatsImage : null), 
            status: valuee,
        };

        console.log("Data to be sent:", newUser  ); // تحقق من البيانات المرسلة

        if (edit) {
            const { snedData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/bus_type/update/${snedData.id}`, newUser  , {
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

        axios.post('https://bcknd.ticket-hub.net/apiadmin/bus_type/add', newUser  , {
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
setValue('inactive')
        setName('');
        setCount('');
        setBusImage(null);
        setPlanImage(null);
        setSeatsImage(null);
        setEdit(false);
    };
  return (
    <div className='ml-6 flex flex-col mt-6 gap-6'>
      <AddAll navGo='/Buses/TypeBuses' name="Add Type Buses " />

      <InputField
                placeholder=" Name"
                name="name"
                value={name}
                onChange={handleChange}
            />
              <InputField
                placeholder="Country Name"
                name="Count"
                value={Count}
                onChange={handleChange}
            />
               <FileUploadButton
                name="busImage"
                // flag={busImage}
                kind="busImage"
                onFileChange={handleFileChange}
              />
                <FileUploadButton
                name="planImage"
                // flag={planImage}
                kind="planImage"
                onFileChange={handleFileChange}
            />
              <FileUploadButton
                name="seatsImage"
                // flag={seatsImage}
                onFileChange={handleFileChange}
                kind="seatsImage"
            />

<SwitchButton value={valuee} setValue={setValue} />


          <button onClick={handleSave}>
                      <img className="my-6" src={picdone} alt="Save" />
                  </button>
                  <ToastContainer />
    </div>
  )
}

export default AddTypeBuses;
