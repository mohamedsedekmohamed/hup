import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PaymentMethods from './PaymentMethods'
//
import Nationality from './Nationality'
import SubjectComplaints from './SubjectComplaints'
import OperatorPayment from './OperatorPayment'
import AddSubjectComplaints from './Addpage/AddSubjectComplaints'
import AddOperatorPayment from './Addpage/AddOperatorPayment'
//
import AddPaymentMethods from './Addpage/AddPaymentMethods'
import AddNationality from './Addpage/AddNationality'
const Settings = () => {
  return (
    <div>
      <Routes>
      <Route path="/Nationality" element={<Nationality />} />
      <Route path="/PaymentMethods" element={<PaymentMethods />} />
      <Route path="/OperatorPayment" element={<OperatorPayment />} />
      <Route path="/AddPaymentMethods" element={<AddPaymentMethods />} />
      <Route path="/AddOperatorPayment" element={<AddOperatorPayment />} />
      <Route path="/AddNationality" element={<AddNationality />} />
      <Route path="/AddSubjectComplaints" element={<AddSubjectComplaints />} />
      <Route path="/SubjectComplaints" element={<SubjectComplaints />} />

      </Routes>
    </div>
  )
}

export default Settings
