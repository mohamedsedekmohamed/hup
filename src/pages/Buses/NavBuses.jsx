import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBuses= () => {
  return (
    <div>
      <nav className="grid grid-cols-4 gap-6 p-5">
      <NavLink 
  to="/Buses" 
  end
  className={({ isActive }) => 
    `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
    ${isActive ? 'border-b-1 border-b-three' : ''}`
  }
>
Buses
        </NavLink>
        <NavLink 
          to="/Buses/TypeBuses"
          className={({ isActive }) => 
            `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Type Buses
        </NavLink>
        <NavLink 
          to="/Buses/BusesHistory"
          className={({ isActive }) => 
            `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Buses History
        </NavLink>
        <NavLink 
          to="/Buses/Operation"
          className={({ isActive }) => 
            `text-center py-3 px-4 text-gray-800 font-semibold border border-transparent transition-colors 
            ${isActive ? 'border-b-1 border-b-three' : ''}`
          }
        >
          Operation   
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBuses;