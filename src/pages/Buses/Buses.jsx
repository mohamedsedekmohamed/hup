import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BusesBuses from './BusesBuses.jsx'
import TypeBuses from './TypeBuses.jsx'
import Operation from './Operation.jsx'
import BusesHistory from './BusesHistory.jsx'
import AddBuses from './addbuses/AddBuses.jsx';
const Buses = () => {
  return (
    <div>
       <Routes>
        
        <Route path="/" element={<BusesBuses/>} />
        <Route path="/TypeBuses" element={<TypeBuses />} />
        <Route path="/BusesHistory" element={<BusesHistory />} />
        <Route path="/Operation" element={<Operation />} />
        <Route path="/AddBuses" element={<AddBuses />} />
   
      </Routes>
    </div>
    
  )
}

export default Buses
