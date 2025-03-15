import React from 'react'
import Threething from '../../component/ThreeThing'
import delet from  '../../assets/delete.svg';
import pin from '../../assets/pin.svg';
const Trips = () => {
    const data = [
        {  
        TripID:"101",  BusesTrains:"bus a",PickUpPoint:"station 1"  ,Station:"station",DropOffPoint: 'station',city: "riyadh"
        ,zone:"cantral",Departure:"08:00am", ArrivaTime: '12:00pm',Available:"10", Price:"SAR",Status:"Active", Action:"" }, 
    
      ];
     
  return (
    <div>
      <Threething navGo='/AddTrips'/>
          <div className=" mt-10 ml-5">
                  <table className="w-full  border-y border-black">
                    <thead  className="w-full">
                      <tr className='bg-four w-[1012px] h-[56px]' >
                        <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">TripID</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left"> Buses&Trains</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Pick-Up Point</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Station</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Drop-Off Point</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">city</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">zone</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Departure</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">ArrivaTime</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Available</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Price</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                        <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                     
                    {data.map((item,index) => (
                        <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
                             <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.TripID}</td>
                          <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.BusesTrains}</td>
                          <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.PickUpPoint}</td>
                          <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Station}</td>
                          <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.DropOffPoint}</td>
                          <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.city}</td>
                          <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.zone}</td>
                          <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Departure}</td>
                          <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.ArrivaTime}</td>
                          <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Available}</td>
                          <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.Price}</td>
                          <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.Status }</span></td>
                          <td className="w-[143px]  h-[56px]  text-[16px]  flex justify-start gap-2 items-center">
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

export default Trips
