import React from 'react'
import Vector from "../../assets/Vector.svg"
import Homeicon from "../../assets/Homeicon.svg"
import Homeic from "../../assets/homeic.svg"
import usericon from "../../assets/usericon.svg"
import Buses from "../../assets/Buses.svg"
import Bookings from "../../assets/Bookings.svg"
import Financial from "../../assets/Financial.svg"
import Trips from "../../assets/Trips.svg"
import Wallet from "../../assets/wallet.svg"
import Wallettwo from "../../assets/wallettwo.svg"
import mainicon from "../../assets/mainicon.svg"
import Agents from "../../assets/Agents.svg"
import commission from "../../assets/commission.svg"
import Complaints from "../../assets/Complaints.svg"
import currency from "../../assets/currency.svg"
import Payout from "../../assets/Payout.svg"
import IconDash from '../../ui/IconDash'
import {  NavLink } from 'react-router-dom'
  // import ro from "../assets/ro.svg"


const Dash = () => {
  const menuItems = [
    { icon: Homeic, text: "Home", href: "/" },
    { icon: usericon, text: "User", href: "/User" },
    { icon: Vector, text: "Location", href: "/Location" },
    { icon: Buses, text: "Buses", href: "/Buses" },
    { icon: Bookings, text: "Bookings", href: "/Bookings" },
    { icon: Trips, text: "Trips", href: "/Trips" },
    { icon: Wallet, text: "Wallet Requests", href: "/WalletRequests" },
    { icon: Wallettwo, text: "Wallet", href: "/Wallet" },
    { icon: Financial, text: "Financial", href: "/Financial" },
    { icon: Agents, text: "Agents", href: "/Agents" },
    { icon: commission, text: "Commission Setup", href: "/CommissionSetup" },
    { icon: Payout, text: "Payout Account", href: "/PayoutAccount" },
    { icon: currency, text: "Currency", href: "/Currency" },
    { icon: Homeicon, text: "Settings", href: "/Settings" },
  ];
  
  return (
    <div className='flex-col w-[290px] h-fit bg-one  text-center py-4'>
   
    <div className='flex mx-auto justify-center gap-2 my-3'>
   <span className='font-[400] text-white text-[32px]'>Ticket hub</span>
   <img src={mainicon} className='rounded-full p-1 bg-three'/>
   </div>
   {/* line */}
   
   <div className='bg-white w-[240px] h-0.5 text-center mx-auto'></div>
   {/* links */}
     
    <div>
      {menuItems.map((item, index) => (
        <NavLink to={item.href}
          key={index}
          className="flex justify-start items-center mx-auto w-[250px] h-[48px] my-2 hover:bg-white  hover:w-[240px] hover:h-[48px] rounded-[8px] group px-2 overflow-hidden"
        >
         
{/* <IconDash icon={item.icon}/> */}
             
          {/* Text */}
          <span className="text-white text-[16px] font-medium ml-4 group-hover:text-one">
            {item.text}
          </span>
        </NavLink>
      ))}
    </div>
          </div>
  )
}

export default Dash
