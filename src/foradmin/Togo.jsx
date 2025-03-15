import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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

const Togo = () => {
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation(); // احصل على المسار الحالي

  // تحديث activeLink عند تغيير المسار
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className='flex overflow-hidden'>
      <Dash activeLink={activeLink}  />
      <div className='w-full'>
        <Home />
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
        </Routes>
      </div>
    </div>
  );
};

export default Togo;