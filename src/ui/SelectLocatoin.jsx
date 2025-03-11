import React, { useState } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';


const SelectLocation = () => {
  const [city, setCity] = useState(''); // لتخزين اسم المدينة
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState([51.505, -0.09]); // موقع افتراضي (لندن)
  const [showMap, setShowMap] = useState(false); // حالة لإظهار الخريطة أو لا

  // دالة للحصول على الموقع الجغرافي واسم المدينة
  const getLocation = async () => {
    setLoading(true);

    // الحصول على الموقع الجغرافي للمستخدم
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // استعلام Nominatim API للحصول على اسم المدينة
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();

        // استخراج اسم المدينة
        const cityName = data.address.city || data.address.town || data.address.village || "Unknown Location";
        setCity(cityName);
        setPosition([latitude, longitude]); // تحديث الموقع على الخريطة
        setLoading(false);
        setShowMap(true); // إظهار الخريطة عند الحصول على الموقع
      }, (error) => {
        console.log(error);
        setLoading(false);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  // مكون لتحديث الموقع عند النقر على الخريطة
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        // استخدام API للحصول على اسم المدينة عند النقر
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          .then(response => response.json())
          .then(data => {
            const cityName = data.address.city || data.address.town || data.address.village || "Unknown Location";
            setCity(cityName);
            setPosition([lat, lng]);
          });
      }
    });

    return position ? (
      <Marker position={position}>
        <Popup>{city}</Popup>
      </Marker>
    ) : null;
  }

  return (
    <div>
      <button
        className='flex w-[450px] h-[72px] bg-six justify-center items-center'
        onClick={getLocation} 
        disabled={loading}
      >
        <CiLocationOn className='h-[36px] w-[30px] gap-2' />
        <span className='text-[20px] font-medium text-one'>
          {loading ? 'Loading location  ' : ` ${city || 'Select the location'}`}
        </span>
      </button>

      {/* عرض الخريطة فقط إذا كانت showMap = true */}
      {showMap && (
        <div className="mt-6 mx-5">
          <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default SelectLocation;
