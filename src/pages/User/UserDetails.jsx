import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserDetails = () => {
    const location = useLocation();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const { snedData } = location.state || {};
        if (snedData) {
            setUserData(snedData);
        }
        console.log('User data:', snedData);    
    }, [location.state]);

    return (
        <div className="min-h-screen my-3 mx-3">
            {userData && userData.bookings.length > 0 ? (
                userData.bookings.map((booking, index) => (
                    <div key={index} className="bg-one w-full h-30 grid grid-cols-3 p-4 mb-4 rounded-lg shadow-lg">
                        <div className="flex flex-col justify-center">
                            <span className="text-2xl font-bold text-white">{booking.trip_name} to {booking.city_residence}</span>
                        </div>
                       
                        <div className=" flex flex-col items-start justify-center text-white">
                            <span className="text-lg font-semibold">deputre time : {booking.deputre_time}</span>
                            <span className="text-lg font-semibold">arrival time : {booking.arrival_time}</span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-lg font-semibold text-gray-700">
                    No bookings found for this user.
                </div>
            )}
         
         <div className='bg-white w-full my-3 flex flex-col  p-3'>
                <span className='text-2xl font-bold py-2'>Operator Information</span>
                <div className='flex gap-3'>
                <span> Country:</span>
                {/* <span>{userData.}</span> */}
                </div>
                <div className='flex gap-3'>
                <span> Country:</span>
                {/* <span>{userData.}</span> */}
                </div>
                </div>
        </div>
    );
};

export default UserDetails;
