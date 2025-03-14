import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Upcoming from './Addbooking/Upcoming';
import BookingHistory from './Addbooking/BookingHistory';
import CurrentBookings from './Addbooking/CurrentBookings';
import CanceledBooking from './Addbooking/CanceledBooking';
const Booking = () => {
  return (
    <Routes>
        
    <Route path="/" element={<Upcoming/>} />
    <Route path="/BookingHistory" element={<BookingHistory/>} />
    <Route path="/CurrentBookings" element={<CurrentBookings/>} />
    <Route path="/CanceledBooking" element={<CanceledBooking/>} />
    
  </Routes>
  )
}

export default Booking
