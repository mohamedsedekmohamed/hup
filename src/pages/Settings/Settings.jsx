import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PaymentMethods from './PaymentMethods'
//
import Nationality from './Nationality'
import SubjectComplaints from './SubjectComplaints'
import AddSubjectComplaints from './Addpage/AddSubjectComplaints'
//
import AddPaymentMethods from './Addpage/AddPaymentMethods'
import AddNationality from './Addpage/AddNationality'
const Settings = () => {
  return (
    <div>
      <Routes>
      <Route path="/Nationality" element={<Nationality />} />
      <Route path="/PaymentMethods" element={<PaymentMethods />} />
      <Route path="/AddPaymentMethods" element={<AddPaymentMethods />} />
      <Route path="/AddNationality" element={<AddNationality />} />
      <Route path="/AddSubjectComplaints" element={<AddSubjectComplaints />} />
      <Route path="/SubjectComplaints" element={<SubjectComplaints />} />

      </Routes>
    </div>
  )
}

export default Settings
