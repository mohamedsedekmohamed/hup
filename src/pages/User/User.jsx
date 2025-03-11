import React from 'react'
import delet from  '../../assets/delete.svg';
import pin from '../../assets/pin.svg';

import ThreeThing from '../../component/ThreeThing';
const User = () => {
    const data = [
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"01234567819", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
        { User: "mohamedAhmed",Number:"0123456789", Wallet: 'visa', Country: 'Egypt', Cities: 'Traveler', Zones:"Downtone",Booking:"**", Action:"" },
       
     
      ];
  return (
    <div>

  <ThreeThing navGo='/AddUser'/>
  <div className=" mt-10 ml-5">
      <table className="w-full  border-y border-black">
        <thead  className="w-full">
          <tr className='bg-four w-[1012px] h-[56px]' >
            <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">User</th>
            <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Wallet</th>
            <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Country</th>
            <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Cities </th>
            <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Zones</th>
            <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Booking </th>
            <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
         
        {data.map((item,index) => (
            <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
               <td className="flex flex-col w-[143px] h-[56px]  absolute top-1 items-start justify-start   ">
  <span className="text-[16px] font-normal text-five px-4">{item.User}</span>
  <span className="text-[16px]   font-normal text-five px-4">{item.Number}</span>
</td>

              <td className="w-[143px]  h-[56px] text-[16px] px-4 ">{item.Wallet}</td>
              <td className="w-[143px]  h-[56px] text-[16px] px-4 ">{item.Country}</td>
              <td className="w-[143px]  h-[56px] text-[16px] px-4 ">{item.Cities }</td>
              <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Zones}</td>
              <td className="w-[143px]  h-[56px]  text-[16px] px-4 ">{item.Booking }</td>
              <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start items-center">
                <img className='w-[24px] h-[24px]' src={pin}/>
                <img  className='w-[24px] h-[24px]' src={delet}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  )
}

export default User
