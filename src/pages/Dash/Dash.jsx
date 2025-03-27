import React, { useState } from 'react';
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
import IconCurrency from '../../IconsImprot/IconCurrency';
import IconPayoutAccount from '../../IconsImprot/IconPayoutAccount';
import IconSetting from '../../IconsImprot/IconSetting';
import { FaCarAlt } from "react-icons/fa";
const Dash = ({ activeLink ,open}) => {
  const [openFinancial, setOpenFinancial] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const menuItems = [
    { icon: <IconHome />, iconactive: <IconHome active />, text: "Home", href: "/" },
    { icon: <IconUser />, iconactive: <IconUser active />, text: "User", href: "/User" },
    { icon: <IconLocation />, iconactive: <IconLocation active />, text: "Location", href: "/Location" },
    { icon: <IconBuses />, iconactive: <IconBuses active />, text: "Buses", href: "/Buses" },
    { icon: <IconBooking />, iconactive: <IconBooking active />, text: "Bookings", href: "/Booking" },
    { icon: <IconTrips />, iconactive: <IconTrips active />, text: "Trips", href: "/Trips" },
    { icon: <IconWalletRequests />, iconactive: <IconWalletRequests active />, text: "Wallet Requests", href: "/WalletRequsts" },
    { icon: <IconWallet />, iconactive: <IconWallet active />, text: "Wallet", href: "/Wallet" },
    { icon: <FaCarAlt  className='text-white'/>, iconactive: <FaCarAlt active />, text: "Car", href: "/Car" },
    {
      icon: <IconFinancial />, iconactive: <IconFinancial active />, text: "Financial", options: [
        { text: "● pending payments  ", href: "/Financial/Payments" },
        { text: "● confirmed payments", href: "/Financial/Commissions" },
        { text: "● canceled payments   ", href: "/Financial/PendingPayments" }
      ]  
    },
    { icon: <IconAgents />, iconactive: <IconAgents active />, text: "Operator", href: "/Agents" },
    { icon: <IconComplaints />, iconactive: <IconComplaints active />, text: "Complaints", href: "/Complaints" },
    { icon: <IconCommissionSetup />, iconactive: <IconCommissionSetup active />, text: "Commission Setup", href: "/Commission" },
    { icon: <IconCurrency />, iconactive: <IconCurrency active />, text: "Currency", href: "/Currency" },
    { icon: <IconPayoutAccount />, iconactive: <IconPayoutAccount active />, text: "Payout Account", href: "/PayoutAccount" },
    {
      icon: <IconSetting />, iconactive: <IconSetting active />, text: "Settings", settingsOptions:
        [
          { text: "● Payment Methods", href: "/Settings/PaymentMethods" },
          { text: "●  Nationality", href: "/Settings/Nationality" },
          { text: "●  Subject Complaints", href: "/Settings/SubjectComplaints" },
        ]
    }
  ];



  return (
    
        <div className="relative h-full">
  <div className="direction-rtl hidden md:block h-full">
    <div className="flex-col w-[300px] h-[calc(100vh-2px)] bg-one text-center overflow-y-scroll overflow-x-hidden direction-ltr">
     
          <div className='flex mx-auto justify-center gap-2 my-3'>
            <span className='font-[400] text-white text-[32px]'>Ticket hub</span>
            <img src={mainicon} className='rounded-full p-1 bg-three' alt="Main Icon" />
          </div>

          {/* Separator Line */}
          <div className='bg-white w-[240px] h-0.5 text-center mx-auto'></div>

          {/* Main Menu Items */}
          <ul className=' p-0'>
            {menuItems.map((item, index) => (
              item.text === "Financial" || item.text === "Settings" ? (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    onClick={() => {
                      if (item.text === "Financial") {
                        setOpenFinancial(!openFinancial);
                      }
                      if (item.text === "Settings") {
                        setOpenSettings(!openSettings);
                      }
                    }}
                    className={`flex justify-start items-center mx-3 w-[250px] relative h-[48px] my-2 rounded-[8px] group overflow-hidden`}
                  >
                    <i className={`text-[16px] font-medium ml-4`}>
                      {item.icon}
                    </i>
                    <span className='text-[16px] font-medium ml-4 text-white'>
                      {item.text}
                    </span>
                  </NavLink>

                  {/* Dropdown Menu for Financial */}
                  {item.text === "Financial" && (
                    <ul className={`flex-col gap-2 mx-6 mt-2 ${openFinancial ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                      {item.options.map((option, index) => (
                        <li key={index}>
                          <NavLink
                            to={option.href}
                            className={`flex justify-start items-center mx-3 w-[250px] ${activeLink === option.href ? 'bg-white' : ''
                              } relative h-[48px] my-2 rounded-[8px] group overflow-hidden`}
                          >
                            <span className={`ml-2 ${activeLink === option.href ? 'text-one' : 'text-white'
                              }`}>
                              {option.text}
                            </span>
                            {activeLink === option.href && (
                              <img
                                src={ro}
                                className="absolute left-49 transition-transform w-15 h-15"
                                alt="Icon"
                              />
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.text === "Settings" && (
                    <ul className={`flex-col gap-2 mx-6 mt-2 ${openSettings ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                      {item.settingsOptions.map((option, index) => (
                        <li key={index}>
                          <NavLink
                            to={option.href}
                            className={`flex justify-start items-center mx-3 w-[250px] ${activeLink === option.href ? 'bg-white' : ''
                              } relative h-[48px] my-2 rounded-[8px] group overflow-hidden`}
                          >
                            <span className={` ml-2 ${activeLink === option.href ? 'text-one' : 'text-white'
                              }`}>
                              {option.text}
                            </span>
                            {activeLink === option.href && (
                              <img
                                src={ro}
                                className="absolute left-49 transition-transform w-15 h-15"
                                alt="Icon"
                              />
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    className={`flex justify-start items-center mx-3 w-[250px] ${activeLink === item.href ? 'bg-white' : ''
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
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
     
  {open&&(

     <div className={`direction-rtl  md:hidden`}>
        <div className='flex-col w-[150px] h-screen bg-one text-center overflow-y-scroll overflow-x-hidden direction-ltr'>
          <div className='flex mx-auto justify-center gap-2 my-3'>
            <span className='font-[400] text-white text-[16px]'>Ticket hub</span>
            <img src={mainicon} className='rounded-full w-6 h-6 p-1 bg-three' alt="Main Icon" />
          </div>

          {/* Separator Line */}
          <div className='bg-white w-[160px] h-0.5 text-center mx-auto'></div>

          {/* Main Menu Items */}
          <ul className=' p-0'>
            {menuItems.map((item, index) => (
              item.text === "Financial" || item.text === "Settings" ? (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    onClick={() => {
                      if (item.text === "Financial") {
                        setOpenFinancial(!openFinancial);
                      }
                      if (item.text === "Settings") {
                        setOpenSettings(!openSettings);
                      }
                    }}
                    className={`flex justify-start items-center mx-3 w-[120px] relative h-[24px] my-2 rounded-[8px] group overflow-hidden`}
                  >
                    <i className={`text-[8px] font-medium ml-4`}>
                      {item.icon}
                    </i>
                    <span className='text-[8px] font-medium ml-4 text-white'>
                      {item.text}
                    </span>
                  </NavLink>

                  {/* Dropdown Menu for Financial */}
                  {item.text === "Financial" && (
                    <ul className={`flex-col gap-2 mx-6 mt-2 ${openFinancial ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                      {item.options.map((option, index) => (
                        <li key={index}>
                          <NavLink
                            to={option.href}
                            className={`flex justify-start items-center mx-3 w-[125px] ${activeLink === option.href ? 'bg-white' : ''
                              } relative h-[24px] my-2 rounded-[8px] group overflow-hidden`}
                          >
                            <span className={` ml-2 text-[8px] ${activeLink === option.href ? 'text-one' : 'text-white'
                              }`}>
                              {option.text}
                            </span>
                            {activeLink === option.href && (
                              <img
                                src={ro}
                                className="absolute left-15 transition-transform w-15 h-15"
                                alt="Icon"
                              />
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.text === "Settings" && (
                    <ul className={`flex-col gap-2 mx-6 mt-2 ${openSettings ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                      {item.settingsOptions.map((option, index) => (
                        <li key={index}>
                          <NavLink
                            to={option.href}
                            className={`flex justify-start items-center mx-3 w-[125px] ${activeLink === option.href ? 'bg-white' : ''
                              } relative h-[24px] my-2 rounded-[8px] group overflow-hidden`}
                          >
                            <span className={` ml-2 text-[8px] ${activeLink === option.href ? 'text-one' : 'text-white'
                              }`}>
                              {option.text}
                            </span>
                            {activeLink === option.href && (
                              <img
                                src={ro}
                                className="absolute left-15 transition-transform w-15 h-15"
                                alt="Icon"
                              />
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    className={`flex justify-start items-center mx-3 w-[125px] ${activeLink === item.href ? 'bg-white' : ''
                      } relative h-[24px] my-2 rounded-[8px] group overflow-hidden`}
                  >
                    {activeLink === item.href && (
                      <img
                        src={ro}
                        className="absolute left-20 transition-transform w-15 h-15"
                        alt="Icon"
                      />
                    )}
                    <i className={`text-[8px] font-medium ml-4`}>
                      {activeLink === item.href ? item.iconactive : item.icon}
                    </i>
                    <span className={`text-[8px] font-medium ml-4 ${activeLink === item.href ? 'text-one' : 'text-white'}`}>
                      {item.text}
                    </span>
                  </NavLink>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
       )} 

    </div>
  );
};

export default Dash;
