import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PaymentMethods from './PaymentMethods'
import CancellationPolicy from './CancellationPolicy'
import AddPaymentMethods from './Addpage/AddPaymentMethods'
const Settings = () => {
  return (
    <div>
      <Routes>
      <Route path="/CancellationPolicy" element={<CancellationPolicy />} />
      <Route path="/PaymentMethods" element={<PaymentMethods />} />
      <Route path="/AddPaymentMethods" element={<AddPaymentMethods />} />

      </Routes>
    </div>
  )
}

export default Settings
