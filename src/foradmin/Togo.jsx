import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Dash from '../pages/Dash/Dash.jsx';
import Home from '../pages/Home/Home.jsx';
import User from '../pages/User/User.jsx';
import AddUser from '../pages/User/AddUser.jsx';
import Location from '../pages/Location/Location.jsx';
import Buses from '../pages/Buses/Buses.jsx';
import Booking from '../pages/Booking/Booking.jsx';
import Trips from '../pages/Trips/Trips.jsx';
import AddTrips from '../pages/Trips/AddTrips.jsx';
import Wallet from '../pages/Wallet/Wallet.jsx';
import WalletRequsts from '../pages/WalletRequsts/WalletRequsts.jsx';
import Agents from '../pages/Agents/Agents.jsx';
import AddAgents from '../pages/Agents/AddAgents.jsx'
//
import Complaints from '../pages/Complaints/Complaints.jsx';
import AddComplaints from '../pages/Complaints/AddComplaints.jsx';
//
import CommissionSetup from '../pages/Commission/Commission.jsx';
import AddCommissionSetup from '../pages/Commission/AddCommission.jsx';
//
import Currency from '../pages/Currency/Currency.jsx';
import AddCurrency from '../pages/Currency/AddCurrency.jsx';
import PayoutAccount from '../pages/Payout/PayoutAccount.jsx';
import AddPayoutAccount from '../pages/Payout/AddPayoutAccount.jsx';
import Financial from '../pages/Financial/Financial.jsx';
import Settings from '../pages/Settings/Settings.jsx';

const Togo = ({ isLoggedIn, setIsLoggedIn }) => {
  const [activeLink, setActiveLink] = useState('/');
  const [open, setopen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
    } else {
      localStorage.setItem('isLoggedIn', 'true');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (location.pathname === '/AddUser') {
        setActiveLink('/User');
    } else if (location.pathname === '/Location/Cities' || location.pathname === '/Location/Zones' || location.pathname === '/Location/Stations' || location.pathname === '/Location/Addcountries' || location.pathname === '/Location/Addcities' || location.pathname === '/Location/Addzones' || location.pathname === '/Location/AddOffStation') {
        setActiveLink('/Location');
    } else if (location.pathname === '/Buses/TypeBuses' || location.pathname === '/Buses/BusesHistory' || location.pathname === '/Buses/Operation' || location.pathname === '/Buses/AddBuses' || location.pathname === '/Buses/AddTypeBuses') {
        setActiveLink('/Buses');
    } else if (location.pathname === '/Booking/BookingHistory' || location.pathname === '/Booking/CurrentBookings' || location.pathname === '/Booking/CanceledBooking') {
        setActiveLink('/Booking');
    } else if (location.pathname === '/Trips' || location.pathname === '/AddTrips') {
        setActiveLink('/Trips');
    } else if (location.pathname === '/Wallet') {
        setActiveLink('/Wallet');
    } else if ( location.pathname === '/WalletRequsts') {
        setActiveLink('/WalletRequsts');
    } else if (location.pathname === '/Agents' || location.pathname === '/AddAgents') {
        setActiveLink('/Agents');
    } else if (location.pathname === '/Complaints' || location.pathname === '/AddComplaints' ) {
        setActiveLink('/Complaints');
    }else if ( location.pathname === '/Commission' || location.pathname === '/AddCommission') {
      setActiveLink('/Commission');
  } else if (location.pathname === '/Currency' || location.pathname === '/AddCurrency') {
        setActiveLink('/Currency');
    } else if (location.pathname === '/PayoutAccount' || location.pathname === '/AddPayoutAccount') {
        setActiveLink('/PayoutAccount');
    } else if (location.pathname === '/Financial') {
        setActiveLink('/Financial');
    } else if (location.pathname === '/PaymentMethods' || location.pathname === '/CancellationPolicy') {
        setActiveLink('/Settings');
    } else if (location.pathname === '/Settings/AddPaymentMethods' ) {
        setActiveLink('/Settings/PaymentMethods');
    } else if (location.pathname === '/Settings/AddNationality' ) {
        setActiveLink('/Settings/Nationality');
    } else if (location.pathname === '/Settings/AddSubjectComplaints' ) {
        setActiveLink('/Settings/SubjectComplaints');
    } else {
        setActiveLink(location.pathname);
    }
}, [location.pathname]);

  return (
    <div className='flex overflow-hidden'>
      <div>
        <Dash activeLink={activeLink} open={open} />
      </div>
      <div className='w-full'>
        <Home setIsLoggedIn={setIsLoggedIn} setopen={setopen} open={open} />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/User' element={<User />} />
          <Route path='/AddUser' element={<AddUser />} />
          <Route path='/Buses/*' element={<Buses />} />
          <Route path='/Location/*' element={<Location />} />
          <Route path='/Booking/*' element={<Booking />} />
          <Route path='/Trips' element={<Trips />} />
          <Route path='/AddTrips' element={<AddTrips />} />
          <Route path='/Wallet' element={<Wallet />} />
          <Route path='/WalletRequsts' element={<WalletRequsts />} />
          <Route path='/Agents' element={<Agents />} />
          <Route path='/AddAgents' element={<AddAgents />} />
          <Route path='/Complaints' element={<Complaints />} />
          <Route path='/AddComplaints' element={<AddComplaints />} />
          {/*  */}
          <Route path='/Commission' element={<CommissionSetup />} />
          <Route path='/AddCommission' element={<AddCommissionSetup />} />
          <Route path='/Currency' element={<Currency />} />
          <Route path='/AddCurrency' element={<AddCurrency />} />
          <Route path='/PayoutAccount' element={<PayoutAccount />} />
          <Route path='/AddPayoutAccount' element={<AddPayoutAccount />} />
          <Route path='/Financial/*' element={<Financial />} />
          <Route path='/Settings/*' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Togo;
