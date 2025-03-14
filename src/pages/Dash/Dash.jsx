import React, { useState } from 'react';
import mainicon from "../../assets/mainicon.svg";
import { NavLink } from 'react-router-dom';
import ro from "../../assets/ro.svg";
import { FaHome, FaUser, FaMapMarkerAlt, FaBus, FaBook, FaWallet, FaMoneyBillAlt, FaUsers, FaCog } from 'react-icons/fa';
const Dash = () => {
  const [activeLink, setActiveLink] = useState('/Homepage');  // حالة لتخزين الرابط النشط

  const menuItems = [
    { icon: <FaHome />, text: "Home", href: "/Homepage" },
    { icon: <FaUser />, text: "User", href: "/User" },
    { icon: <FaMapMarkerAlt />, text: "Location", href: "/Location" },
    { icon: <FaBus />, text: "Buses", href: "/Buses" },
    { icon: <FaBook />, text: "Bookings", href: "/Booking" },
    { icon: <FaBook />, text: "Trips", href: "/Trips" },
    { icon: <FaWallet />, text: "Wallet Requests", href: "/WalletRequests" },
    { icon: <FaWallet />, text: "Wallet", href: "/Wallet" },
    { icon: <FaMoneyBillAlt />, text: "Financial", href: "/Financial" },
    { icon: <FaUsers />, text: "Agents", href: "/Agents" },
    { icon: <FaCog />, text: "Commission Setup", href: "/CommissionSetup" },
    { icon: <FaCog />, text: "Payout Account", href: "/PayoutAccount" },
    { icon: <FaCog />, text: "Currency", href: "/Currency" },
    { icon: <FaCog />, text: "Settings", href: "/Settings" },
  ];

  const handleClick = (href) => {
    setActiveLink(href);
  };

  return (
    <div className='flex-col w-[290px] h-fit bg-one text-center py-4'>
      <div className='flex mx-auto justify-center gap-2 my-3'>
        <span className='font-[400] text-white text-[32px]'>Ticket hub</span>
        <img src={mainicon} className='rounded-full p-1 bg-three' />
      </div>

      {/* line */}
      <div className='bg-white w-[240px] h-0.5 text-center mx-auto'></div>

      {/* links */}
      <div >
        {menuItems.map((item, index) => (
          <NavLink
            to={item.href}
            key={index}
            onClick={() => handleClick(item.href)} 
            className={`flex justify-start items-center mx-3  w-[250px] relative h-[48px] my-2 rounded-[8px] group  overflow-hidden
            ${activeLink === item.href ? 'bg-white ' : ''}`}
          >
            
            {activeLink === item.href && (
              <img
                src={ro}
                className="absolute left-49 transition-transform w-15 h-15"
                alt="Icon"
              />
            )}
  <i
              className={` text-[16px] font-medium ml-4 ${activeLink === item.href ? 'text-one' : 'text-white'}`}
            >
              {item.icon}
            </i>
              <span
              className={` text-[16px] font-medium ml-4 ${activeLink === item.href ? 'text-one' : 'text-white'}`}
            >
              {item.text}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Dash;
