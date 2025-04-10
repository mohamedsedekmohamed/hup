import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconDash from '../../ui/IconDash';

const UserDetails = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const { snedData } = location.state || {}; // Keeping original naming for consistency
    if (snedData) {
      setUserData(snedData);
    }
    console.log('User data:', snedData);
  }, [location.state]);

  const handlegoid = (index) => {
    const sendData = userData.bookings?.[index];
    if (sendData) {
      navigate('/Userbookingdetails', { state: { snedData: sendData } });
    }
  };

  return (
    <div className="flex gap-5 flex-wrap items-center m-5">
     
     <div className='flex justify-between w-full'>
      <h4 className="w-full text-right text-4xl font-bold">Booking</h4>

      <button
        className="transform rotate-180 w-full text-right "
        onClick={() => navigate("/User")}
        >
        <IconDash
          width="20"
          height={30}
          tone="#1E1E2F"
          icon="M14.369 15.9496L22.5296 7.88571C22.959 7.45891 23.2 6.88156 23.2 6.27976C23.2 5.67796 22.959 5.10061 22.5296 4.67381C22.3153 4.4603 22.0604 4.29084 21.7795 4.17519C21.4985 4.05954 21.1972 4 20.8929 4C20.5886 4 20.2873 4.05954 20.0064 4.17519C19.7254 4.29084 19.4705 4.4603 19.2562 4.67381L9.48188 14.3323C9.26581 14.5441 9.09431 14.796 8.97728 15.0736C8.86024 15.3512 8.79999 15.6489 8.79999 15.9496C8.79999 16.2504 8.86024 16.5481 8.97728 16.8257C9.09431 17.1033 9.26581 17.3552 9.48188 17.567L19.2562 27.3394C19.4716 27.5505 19.727 27.7175 20.0079 27.8309C20.2888 27.9442 20.5895 28.0017 20.8929 28C21.1963 28.0017 21.497 27.9442 21.7779 27.8309C22.0588 27.7175 22.3142 27.5505 22.5296 27.3394C22.959 26.9126 23.2 26.3352 23.2 25.7334C23.2 25.1316 22.959 24.5543 22.5296 24.1275L14.369 15.9496Z" 
          />
      </button>
          </div> 

      <div className="mt-10 ml-5 hidden lg:block w-full">
        <table className="w-full border-y border-black">
          <thead>
            <tr className="bg-four w-full h-[56px]">
              <th className="text-left ">Route</th>
              <th className="text-left px-2">Date</th>
              <th className="text-left px-2">country residence</th>
              <th className="text-left px-2">Time</th>
              <th className="text-left px-2">Booking</th>
            </tr>
          </thead>
          <tbody>
            {userData.bookings && userData.bookings.length > 0 ? (
              userData.bookings.map((booking, index) => (
                <tr
                  key={index}
                  className="border-y hover:border-y-4 relative hover:bg-six"
                >
                  <td className="w-[143px] h-[56px]  text-[16px] font-normal text-five px-1 ">
              {`${booking.city_residence}-->${booking.to_city}`}
                  </td>

                  <td className="w-[143px] h-[56px]  px-1">{booking.date}</td>
                  <td className="w-[143px] h-[56px] px-1">{booking.country_residence}</td>
                  <td className="w-[143px] h-[56px] px-1">{booking.deputre_time}</td>
                  <td className="w-[143px] h-[56px] px-1">
                    <button className="underline bg-three text-white rounded-3xl px-2 py-1" onClick={() => handlegoid(index)}>Details</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No Bookings</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
