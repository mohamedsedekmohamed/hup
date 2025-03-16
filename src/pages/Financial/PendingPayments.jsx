import React from 'react'
import { Route, Routes } from 'react-router-dom';


const PendingPayments = () => {
  return (
    <div>
       <Routes>
        
        <Route path="/" element={<Payments/>} />
        <Route path="/AddCountries" element={<AddCountries/>} />
       
      </Routes>
    </div>
  )
}

export default PendingPayments
