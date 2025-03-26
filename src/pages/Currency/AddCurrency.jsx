import React, {  useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AddAll from '../../ui/AddAll'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
import SwitchButton from '../../ui/SwitchButton';

const AddCurrency = () => {
    const navigate = useNavigate();
    const location = useLocation();
       const [edit, setEdit] = useState(false);
       const [status  , setstatus  ] = useState("0");
      const [symbol, setsymbol] = useState('');
       const [name, setName] = useState('');
        const [errors, setErrors] = useState({
               symbol:"",
                 name: '',
                 status  :'',
               });
                 useEffect(() => {
                     const { snedData } = location.state || {};
                     if (snedData) {
                       setsymbol(snedData.symbol);
                       setName(snedData.name);
                       setstatus(snedData.status);
                       setEdit(true);
                       console.log(snedData)
                     }
                   }, [location.state]);
                   const handleChange = (e) => {
                    const { name, value } = e.target;
                    if (name === 'symbol') setsymbol(value);
                    if (name === 'name')setName(value);
                  };

                   const validateForm = () => {
                            let formErrors = {};
                            if (!symbol) formErrors.symbol = 'symbol is required';
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
                        
                            const newUser = {
                              name: name,
                              symbol: symbol,
                              status: status,
                            
                            };
                        
                            console.log("Data to be sent:", newUser);
                        
                            if (edit) {
                              const { snedData } = location.state || {};
                              axios.put(`https://bcknd.ticket-hub.net/api/admin/currency/update/${snedData.id}`, newUser, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              })
                                .then(response => {
                                  console.log('Currency updated successfully:', response.data);
                                  toast.success('Currency updated successfully');
                                  setTimeout(() => {
                                    navigate('/Currency');
                                  }, 3000);
                                })
                                .catch(error => {
                                  console.error('Error updating country:', error);
                                });
                              return;
                            }
                        
                            axios.post('https://bcknd.ticket-hub.net/api/admin/currency/add', newUser, {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then(response => {
                                console.log('Currency added successfully:', response.data);
                                toast.success('Currency added successfully');

                                setTimeout(() => {
                                  navigate('/Currency');
                                }, 3000);
                              })
                              .catch(error => {
                                console.error('Error adding country:', error);
                              }); 
                            console.log("data will send")
                            console.log(newUser)
                   
                            setsymbol('');
                            setName('');
                            setstatus('')
                            setEdit(false);
                          };
                        
    return (
        <div className='ml-6 flex flex-col  mt-6 gap-6'>
    
        <AddAll navGo='/Currency' name="add Currency "  />
        <div className='flex flex-col gap-6  mt-6'>
        <InputField    placeholder="Currency"
      name="name"
      value={name}
      onChange={handleChange}
      required/>
        <InputField    placeholder="symbol"
      name="symbol"
      value={symbol}
      onChange={handleChange}
      required/>
    
    <SwitchButton value={status} num title="stutes" setValue={setstatus} />
    </div>
    

<button onClick={handleSave}>
      <img className="my-6" src={picdone} alt="Save" />
    </button>    
        <ToastContainer />
    
    </div>
  )
}

export default AddCurrency
