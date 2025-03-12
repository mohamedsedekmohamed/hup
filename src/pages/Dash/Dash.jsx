import React, { useState } from 'react';
import mainicon from "../../assets/mainicon.svg";
import { NavLink } from 'react-router-dom';
import ro from "../../assets/ro.svg";

const Dash = () => {
  const [activeLink, setActiveLink] = useState('/');  // حالة لتخزين الرابط النشط

  const menuItems = [
    { icon: <></>, text: "Home", href: "/" },
    { icon: <></>, text: "User", href: "/User" },
    { icon: <></>, text: "Location", href: "/Location" },
    { icon: <></>, text: "Buses", href: "/Buses" },
    { icon: <></>, text: "Bookings", href: "/Bookings" },
    { icon: <></>, text: "Trips", href: "/Trips" },
    { icon: <></>, text: "Wallet Requests", href: "/WalletRequests" },
    { icon: <></>, text: "Wallet", href: "/Wallet" },
    { icon: <></>, text: "Financial", href: "/Financial" },
    { icon: <></>, text: "Agents", href: "/Agents" },
    { icon: <></>, text: "Commission Setup", href: "/CommissionSetup" },
    { icon: <></>, text: "Payout Account", href: "/PayoutAccount" },
    { icon: <></>, text: "Currency", href: "/Currency" },
    { icon: <></>, text: "Settings", href: "/Settings" },
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
