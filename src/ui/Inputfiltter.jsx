import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const Inputfiltter = ({ placeholder, value, like, onChange, name, shara }) => {
  const [arrThing, setArrthing] = useState([]);
  const [control, setControl] = useState(name);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (name === "cities" || name === "zones") {
      axios.get(`https://bcknd.ticket-hub.net/api/admin/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        if (name === "cities") {
          
          console.log(typeof shara)
          console.log(   shara)
          const filteredCities = response.data.cities
            .filter(city => city.country_id == shara) 
            .map(city => ({
              name: city.name,
              country_id: city.country_id,
              id:city.id,
            }));

          setArrthing(filteredCities); 
          console.log("Filtered Cities:", filteredCities); 
        } else if (name === "zones") {
          setArrthing(response.data.zones);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  }, [name, shara]); // shara كمتابع لتحديث البيانات عند تغييرها

  const shape = like
    ? "absolute top-[40%] left-65 w-[18px] h-[24px] transition group-focus-within:rotate-90"
    : "absolute top-[40%] right-4 w-[18px] h-[24px] transition group-focus-within:rotate-90";

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
        className="w-[300px] h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10"
      >
        <option value="">{placeholder}</option> {/* قيمة افتراضية */}
        {arrThing && arrThing.length > 0 && arrThing.map((item,index) => {
          if (control === "countries") {
            return (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            );
          } else if (control === "cities") {
            return (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            );
          } else if (control === "zones") {
            return (
              <option key={index} value={item.id}> {/* استخدام item.id كقيمة */}
                {item.name}
              </option>
            );
          } else {
            return null; // إرجاع null إذا لم يتم تطابق أي شرط
          }
        })}
      </select>
    </div>
  );
};

export default Inputfiltter;