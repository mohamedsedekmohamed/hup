import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import IconDash from '../../../ui/IconDash';

import styled from 'styled-components';
const Bookingdetails = () => {
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const { snedData } = location.state || {};
        if (snedData) {
            setUserData(snedData);
        }
        console.log('User data:', snedData);    
    }, [location.state]);
   
    const handlegoid = (index) => {
        const snedData = userData.bookings[index]  
        navigate('/Bookingdetailsmore', { state: { snedData}});
    }
    return (
        <div className='flex gap-5 flex-wrap items-center m-5'>
            <h4 className='w-full text-center text-4xl font-bold'> booking</h4>
            <button className=' transform rotate-180 w-full text-right ' onClick={() => navigate("/Booking")}>
           <IconDash width="20" height={30} tone="#1E1E2F" icon="M14.369 15.9496L22.5296 7.88571C22.959 7.45891 23.2 6.88156 23.2 6.27976C23.2 5.67796 22.959 5.10061 22.5296 4.67381C22.3153 4.4603 22.0604 4.29084 21.7795 4.17519C21.4985 4.05954 21.1972 4 20.8929 4C20.5886 4 20.2873 4.05954 20.0064 4.17519C19.7254 4.29084 19.4705 4.4603 19.2562 4.67381L9.48188 14.3323C9.26581 14.5441 9.09431 14.796 8.97728 15.0736C8.86024 15.3512 8.79999 15.6489 8.79999 15.9496C8.79999 16.2504 8.86024 16.5481 8.97728 16.8257C9.09431 17.1033 9.26581 17.3552 9.48188 17.567L19.2562 27.3394C19.4716 27.5505 19.727 27.7175 20.0079 27.8309C20.2888 27.9442 20.5895 28.0017 20.8929 28C21.1963 28.0017 21.497 27.9442 21.7779 27.8309C22.0588 27.7175 22.3142 27.5505 22.5296 27.3394C22.959 26.9126 23.2 26.3352 23.2 25.7334C23.2 25.1316 22.959 24.5543 22.5296 24.1275L14.369 15.9496Z" />
           </button>

        {userData.bookings && userData.bookings.length > 0 ? (
          userData.bookings.map((booking, index) => (
            <StyledWrapper key={index}>
              <div className="card">
                <button className='w-full text-center font-bold text-white'>{booking.trip_name}</button>
                <button
                  className="absolute bottom-4 bg-white px-2 rounded-3xl right-4 text-black"
                  onClick={() => handlegoid(index)}    
                >
                  Details
                </button>
              </div>
            </StyledWrapper>
          ))
        ) : (
          <span>No Bookings</span>
        )}
      </div>
    
  
       

    );
};
const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    background: #f58220;
    position: relative;
    display: flex;
    overflow: hidden;
    border-radius: 20px;
  }

  .card button {
    z-index: 1;
  }

  .card::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 130%;
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }

  @keyframes rotBGimg {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

 `;


export default Bookingdetails;
