import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDateRange } from 'react-icons/md'; // تأكد من أنك تستخدم هذه المكتبة
import { TbPhoneCalling } from 'react-icons/tb'; // تأكد من أنك تستخدم هذه المكتبة
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import IconDash from '../../../ui/IconDash';

const Bookingdetailsmore = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const { snedData } = location.state || {};
    if (snedData) {
      setUserData(snedData);
    }
  }, [location.state]);

  return (
    <div className='px-5 my-10'>
          

      {userData ? (
        <div className="bg-one w-full h-30 grid grid-cols-3 p-4 mb-4 rounded-lg shadow-lg">
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-bold text-white">
              {userData.trip_name} to {userData.city_residence}
            </span>
          </div>
          <div className="flex flex-col items-start justify-center text-white">
            <span className="text-lg font-semibold">departure time: {userData.deputre_time}</span>
            <span className="text-lg font-semibold">arrival time: {userData.arrival_time}</span>
          </div>
        </div>
      ) : (
        <div className="bg-one w-full h-30 flex justify-center items-center text-center text-lg font-semibold text-gray-700">
          No bookings found for this user.
        </div>
      )}
       <button className=' transform rotate-180 w-full text-right ' onClick={() => navigate(-1)}>
           <IconDash width="20" height={30} tone="#1E1E2F" icon="M14.369 15.9496L22.5296 7.88571C22.959 7.45891 23.2 6.88156 23.2 6.27976C23.2 5.67796 22.959 5.10061 22.5296 4.67381C22.3153 4.4603 22.0604 4.29084 21.7795 4.17519C21.4985 4.05954 21.1972 4 20.8929 4C20.5886 4 20.2873 4.05954 20.0064 4.17519C19.7254 4.29084 19.4705 4.4603 19.2562 4.67381L9.48188 14.3323C9.26581 14.5441 9.09431 14.796 8.97728 15.0736C8.86024 15.3512 8.79999 15.6489 8.79999 15.9496C8.79999 16.2504 8.86024 16.5481 8.97728 16.8257C9.09431 17.1033 9.26581 17.3552 9.48188 17.567L19.2562 27.3394C19.4716 27.5505 19.727 27.7175 20.0079 27.8309C20.2888 27.9442 20.5895 28.0017 20.8929 28C21.1963 28.0017 21.497 27.9442 21.7779 27.8309C22.0588 27.7175 22.3142 27.5505 22.5296 27.3394C22.959 26.9126 23.2 26.3352 23.2 25.7334C23.2 25.1316 22.959 24.5543 22.5296 24.1275L14.369 15.9496Z" />
           </button>
 <div className="bg-white w-full flex flex-col gap-3">
        <span className="text-2xl font-bold flex gap-2 items-center">
          <TbPhoneCalling /> Operator Information
        </span>
            <div >
              <div className="flex gap-3 my-2">
                <span>agent id:</span>
                <span>{userData.agent_id ?? 'no agent id'}</span>
              </div>
              <div className="flex gap-3 my-2">
                <span>agent name:</span>
                <span>{userData.agent_name ?? 'no agent name'}</span>
              </div>
              <div className="flex gap-3 my-2">
                <span>agent email:</span>
                <span>{userData.agent_email ?? 'no agent email'}</span>
              </div>
              <div className="flex gap-3 my-2">
                <span>agent phone:</span>
                <span>{userData.agent_phone ?? 'no agent phone'}</span>
              </div>
              <div className="flex gap-3 my-2">
                <span>agent code:</span>
                <span>{userData.agent_code ?? 'no agent code'}</span>
              </div>
            </div>
      </div>
      <div className="bg-yellow-200 w-full my-3 flex flex-col gap-3 p-3">
        <span className="text-2xl font-bold py-2 flex gap-2 items-center">
          <MdOutlineDateRange /> Departure Information
        </span>
            <div>
              <div className="flex gap-3 my-2">
                <span>date:</span>
                <span>{userData.date ?? 'no date'}</span>
              </div>
              <div className="flex gap-3 my-2">
                <span>Departure location:</span>
                <span>
                  {userData.deputre_time == null
                    ? 'no Departure location'
                    : `${userData.trip_name}, ${userData.city_residence}, ${
                        userData.destination_from === null ? 'no destination from' : userData.destination_from
                      }, ${userData.country_residence ?? 'no country residence'}`}
                </span>
              </div>
              <div className="flex gap-3 my-2">
                <span>Departure time:</span>
                <span>{userData.deputre_time ?? 'no departure time'}</span>
              </div>
              <div className="flex gap-3">
                <span>Arrival location:</span>
                <span>{userData.destination_to ?? 'no destination to'}</span>
              </div>
              <div className="flex gap-3 my-2">
                <span>Arrival time:</span>
                <span>{userData.arrival_time ?? 'no arrival time'}</span>
              </div>
            </div>
      
      </div>

      <div className="bg-white w-full flex flex-col gap-3">
        <span className="text-2xl font-bold flex gap-2 items-center">
          <MdAirlineSeatReclineExtra /> Passenger Details
        </span>
        <div className='flex gap-15'>
        {userData.booking_users && userData.booking_users.length > 0 ? (
          userData.booking_users.map((user, index) => (
            <div key={index} >
              <div className="flex gap-3 my-2">
                <span>Name:</span>
                <span>{user.name ?? 'No name'}</span>
              </div>
              <div className="flex gap-3 my-2">
                <span>Age:</span>
                <span>{user.age ?? 'No age'}</span>
              </div>
              <div className="flex gap-3 my-2">
                <span>Email:</span>
                <span>{user.user_email ?? 'No email'}</span>
              </div>
              <div className="flex gap-3 my-2">
                <span>Phone:</span>
                <span>{user.user_phone ?? 'No phone'}</span>
              </div>
            </div>
          ))
        ) : (
          <div>No passengers information available.</div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Bookingdetailsmore;
