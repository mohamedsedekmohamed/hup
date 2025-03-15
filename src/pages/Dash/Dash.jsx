import React from 'react';
import { NavLink } from 'react-router-dom';
import mainicon from "../../assets/mainicon.svg";
import ro from "../../assets/ro.svg";
import IconHome from '../../IconsImprot/IconHome';
import IconUser from '../../IconsImprot/IconUser';
import IconLocation from '../../IconsImprot/IconLocation';
import IconBuses from '../../IconsImprot/IconBuses';
import IconTrips from '../../IconsImprot/IconTrips';
import IconBooking from '../../IconsImprot/IconBooking';
import IconWalletRequests from '../../IconsImprot/IconWalletRequests';
import IconWallet from '../../IconsImprot/IconWallet';
import IconFinancial from '../../IconsImprot/IconFinancial';
import IconAgents from '../../IconsImprot/IconAgents';
import IconComplaints from '../../IconsImprot/IconComplaints';
import IconCommissionSetup from '../../IconsImprot/IconCommissionSetup';

const Dash = ({ activeLink }) => {
  const menuItems = [
    { icon: <IconHome />, iconactive: <IconHome active />, text: "Home", href: "/" },
    { icon: <IconUser />, iconactive: <IconUser active />, text: "User", href: "/User" },
    { icon: <IconLocation />, iconactive: <IconLocation active />, text: "Location", href: "/Location" },
    { icon: <IconBuses />, iconactive: <IconBuses active />, text: "Buses", href: "/Buses" },
    { icon: <IconBooking />, iconactive: <IconBooking active />, text: "Bookings", href: "/Booking" },
    { icon: <IconTrips />, iconactive: <IconTrips active />, text: "Trips", href: "/Trips" },
    { icon: <IconWalletRequests />, iconactive: <IconWalletRequests active />, text: "Wallet Requests", href: "/WalletRequsts" },
    { icon: <IconWallet />, iconactive: <IconWallet active />, text: "Wallet", href: "/Wallet" },
    { icon: <IconFinancial />, iconactive: <IconFinancial active />, text: "Financial", href: "/Financial" },
    { text: "1", href: "/1" },
    { text: "2", href: "/2" },
    { text: "3", href: "/3" },
    { icon: <IconAgents />, iconactive: <IconAgents active />, text: "Agents", href: "/Agents" },
    { icon: <IconComplaints />, iconactive: <IconComplaints active />, text: "Complaints", href: "/Complaints" },
    { icon: <IconCommissionSetup />, iconactive: <IconCommissionSetup active />, text: "Commission Setup", href: "/CommissionSetup" },
    { icon: <IconHome />, iconactive: <IconHome active />, text: "Payout Account", href: "/PayoutAccount" },
    { icon: <IconHome />, iconactive: <IconHome active />, text: "Currency", href: "/Currency" },
    { icon: <IconHome />, iconactive: <IconHome active />, text: "Settings", href: "/Settings" },
  ];

  return (
    <div className='flex-col w-[290px] h-fit bg-one text-center py-4'>
      <div className='flex mx-auto justify-center gap-2 my-3'>
        <span className='font-[400] text-white text-[32px]'>Ticket hub</span>
        <img src={mainicon} className='rounded-full p-1 bg-three' alt="Main Icon" />
      </div>

      {/* Separator Line */}
      <div className='bg-white w-[240px] h-0.5 text-center mx-auto'></div>

      {/* Main Menu Items */}
      <div>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <NavLink
              to={item.href}
              className={`flex justify-start items-center mx-3 w-[250px] ${
                activeLink === item.href ? 'bg-white' : ''
              } relative h-[48px] my-2 rounded-[8px] group overflow-hidden`}
            >
              {activeLink === item.href && (
                <img
                  src={ro}
                  className="absolute left-49 transition-transform w-15 h-15"
                  alt="Icon"
                />
              )}
              <i className={`text-[16px] font-medium ml-4`}>
                {activeLink === item.href ? item.iconactive : item.icon}
              </i>
              <span className={`text-[16px] font-medium ml-4 ${activeLink === item.href ? 'text-one' : 'text-white'}`}>
                {item.text}
              </span>
            </NavLink>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dash;