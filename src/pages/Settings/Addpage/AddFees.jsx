
import React, { useEffect, useState } from 'react';
import AddAll from '../../../ui/AddAll';
import picdone from '../../../assets/picdone.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputField from '../../../ui/InputField';

const AddFees = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [train, settrain] = useState('');
    const [bus, setbus] = useState('');
    const [hiacs, sethiacs] = useState('');
    const [Private, setPrivate] = useState('');
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState("enter value like this 0.00 or .00");
   

    const [errors, setErrors] = useState({
      train: '',
      bus: '',
      hiacs: '',
      Private: '',
    });

  
    useEffect(() => {
        const { snedData } = location.state || {};
        if (snedData) {
          if(snedData.train_fees)
          settrain(snedData.train_fees);
          setbus(snedData.bus_fees);
          sethiacs(snedData.hiace_fees);
          setPrivate(snedData.private_request_fees);
            setEdit(true);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'train') settrain(value);
        if (name === 'bus') setbus(value);
        if (name === 'hiace') sethiacs(value);
        if (name === 'Private') setPrivate(value);
    };

    const validateForm = () => {
        let formErrors = {};
        if (train === '') {
          formErrors.train = 'Train is required';
        } else if (isNaN(train)) {
          formErrors.train = 'Train must be a number';
        } else if (Number(train) < 0) {
          formErrors.train = 'Train must not be a negative number';
        } else {
          let trainStr = train.toString();
          if (trainStr.startsWith('.')) {
            trainStr = '0' + trainStr;
          }
        
          // شرط رفض الأرقام الصحيحة (اللي ما فيها كسر عشري)
          if (!trainStr.includes('.')) {
            formErrors.train = 'Train must be a decimal number';
          } else {
            const decimalPart = trainStr.split('.')[1];
            if (decimalPart.length > 2) {
              formErrors.train = 'Train must have at most 2 decimal places';
            }
          }
        }
        
        
        if ( bus === '') {
          formErrors.bus = 'bus is required';
        } else if (isNaN(bus)) {
          formErrors.bus = 'bus must be a number';
        } else if (Number(bus) < 0) {
          formErrors.bus = 'bus must not be a negative number';
        }  else {
          let busStr = bus.toString();
        
          if (busStr.startsWith('.')) {
            busStr = '0' + busStr;
          }
            if (busStr.indexOf('.') !== -1) {
            const decimalPart = busStr.split('.')[1];
            if (decimalPart.length > 2) {
              formErrors.bus = 'bus must have at most 2 decimal places';
            }
          }
        }

        if ( Private === '') {
          formErrors.Private = 'Private is required';
        } else if (isNaN(Private)) {
          formErrors.Private = 'Private must be a number';
        } else if (Number(Private) < 0) {
          formErrors.Private = 'Private must not be a negative number';
        }       else {
          let PrivateStr = Private.toString();
        
          if (Private.startsWith('.')) {
            PrivateStr = '0' + PrivateStr;
          }
            if (PrivateStr.indexOf('.') !== -1) {
            const decimalPart = PrivateStr.split('.')[1];
            if (decimalPart.length > 2) {
              formErrors.Private = 'bus Private have at most 2 decimal places';
            }
          }
        }

        if ( hiacs === '') {
          formErrors.hiacs = 'hiacs is required';
        } else if (isNaN(hiacs)) {
          formErrors.hiacs = 'hiacs must be a number';
        } else if (Number(hiacs) < 0) {
          formErrors.hiacs = 'hiacs must not be a negative number';
        }      
        else {
          let hiacsStr = hiacs.toString();
        
          if (Private.startsWith('.')) {
            hiacsStr = '0' + hiacsStr;
          }
            if (hiacsStr.indexOf('.') !== -1) {
            const decimalPart = hiacsStr.split('.')[1];
            if (decimalPart.length > 2) {
              formErrors.Private = 'bus Private have at most 2 decimal places';
            }
          }
        }

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
          train_fees: train,
          bus_fees  : bus,
          hiace_fees  :  hiacs ,
          private_request_fees   : Private ,
        };

        

        if (edit) {
            const { snedData } = location.state || {};
            axios.put(`https://bcknd.ticket-hub.net/api/admin/fees/update/${snedData.id}`, newCountryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    toast.success('fees updated successfully');
                    setTimeout(() => {
                        navigate('/Settings/Fees');
                    }, 3000);
                })
                .catch(() => {
                });
            return;
        }

        axios.post('https://bcknd.ticket-hub.net/api/admin/fees/add', newCountryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                toast.success('fees added  successfully');

                setTimeout(() => {
                    navigate('/Settings/Fees');
                }, 3000);
            })
            .catch(() => {
            });
             settrain('');
             setbus('');
             sethiacs('');
          setPrivate('');

        setEdit(false);
    };

    return (
      <div className='ml-6 mt-6 '>

            <AddAll navGo='/Settings/Fees' name="Add Fees" />
        <div className=' flex flex-wrap mt-6 gap-6'>
          <div>

            <InputField
                placeholder="train fees "
                name="train"
                value={train}
                email="number"
                onChange={handleChange}
                />
                <span className="text-red-500">{errors.train?`${show}`:""}</span>
                </div>
          <div>

            <InputField
                placeholder="bus fees"
                name="bus"
                value={bus}
                email="number"
                onChange={handleChange}
                />
             <span className="text-red-500">{errors.bus?`${show}`:""}</span>
                </div>
          <div>

            <InputField
                placeholder="hiace fees"
                name="hiace"
                value={hiacs}
                email="number"
                onChange={handleChange}
                />
            <span className="text-red-500">{errors.hiacs?`${show}`:""}</span>
                </div>
          <div>

            <InputField
                placeholder="Private fees"
                name="Private"
                value={Private}
                email="number"
                onChange={handleChange}
                />
                            <span className="text-red-500">{errors.Private?`${show}`:""}</span>

                </div>
                </div>

            <button onClick={handleSave}>
            <img className="my-6 w-75 h-20" src={picdone} alt="Save" />
            </button>
            <ToastContainer />
        </div>
    );
};

export default AddFees;
