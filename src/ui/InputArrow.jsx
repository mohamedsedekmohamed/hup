import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const InputArrow = ({ placeholder, value, like, onChange, name  }) => {
  const [arrayof, setArray] = useState([]);
  const [control, setControl] = useState(name);

  const shape = like
    ? "absolute top-[40%] left-65 w-[18px] h-[24px] transition group-focus-within:rotate-90"
    : "absolute top-[40%] right-4 w-[18px] h-[24px] transition group-focus-within:rotate-90";

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`https://bcknd.ticket-hub.net/api/admin/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (name === "countries") return setArray(response.data.countries);
        if (name === "cities") return setArray(response.data.cities);
        if (name === "zones") return setArray(response.data.zones);
        if (name === "users") return setArray(response.data.users);
        if (name === "car_categories") return setArray(response.data);
        if (name === "car_brands") return setArray(response.data);
        if (name === "operators") return setArray(response.data.operators);
       
      })
      .catch(error => {
        console.log(token);
        console.error('Error fetching data:', error);
      });
  }, [name]);  

  return (
    <div className="relative group">
      <IoIosArrowDown className={shape} />

      <select
        id="options"
        value={value}
        onChange={onChange}
        name={name}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          paddingRight: '20px',
          backgroundImage: 'none',
        }}
        className="w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10"
      >
        <option value="null">{placeholder}</option>
        {arrayof && arrayof.length > 0 && arrayof.map((item) => {
          if (control === "countries") {
            return (
              <option key={item.id} value={item.id}>
              {item.name}
            </option>
            );
          } else if (control === "cities") {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          } else if (control === "zones") {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          } 
          else if (control === "bus_types") {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          }  else if (control === "users") {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
          }  else if (control === "car_categories") {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
          }  else if (control === "car_brands") {
              return (
                <option key={item.category_id} value={item.category_id}>
                  {item.category_name}
                </option>
              );
          }  else if (control === "operators") {
              return (
                <option key={item.id} value={item.id}>
                {item.name}
              </option>
              );
          } else {
            return null; 
          }
        })}
      </select>
    </div>
  );
};

export default InputArrow;
