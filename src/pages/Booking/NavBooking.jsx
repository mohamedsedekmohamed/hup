import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBooking = () => {
  return (
    <div>
      <nav className="grid grid-cols-4 gap-6 p-5">
      <NavLink 
  to="/Booking" 
  end
  className={({ isActive }) => 
    `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
    ${isActive ? 'border-b-1 border-b-three' : ''}`
  }
>
Upcoming
        </NavLink>
        <NavLink 
          to="/Booking/BookingHistory"
          className={({ isActive }) => 
            `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Booking History
        </NavLink>
        <NavLink 
          to="/Booking/CurrentBookings"
          className={({ isActive }) => 
            `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Current Bookings
        </NavLink>
        <NavLink 
          to="/Booking/CanceledBooking"
          className={({ isActive }) => 
            `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Canceled Booking   
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBooking;