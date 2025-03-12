import React from 'react'
import NavBuses from './NavBuses.jsx'
import ThreeThing from '../../component/ThreeThing.jsx';

const Operation = () => {
  const data = [
    {   OperationID: 'OP-001', BusNumber: 'BUS-001', OperationType:"Maintenance",Date:"2025-03-05", PerformedBy:"Admin",Status:"Completed"},
  ];
  return (
    <div>
            <NavBuses/>
            <ThreeThing like navGo='/Buses/AddTypeBuses'/>
            
            <div className=" mt-10 ml-5">
                        <table className="w-full  border-y border-black">
                          <thead  className="w-full">
                            <tr className='bg-four w-[1012px] h-[56px]' >
                              <th className="w-[158px] h-[56px]  text-[16px] border-b text-left">Operation ID</th>
                              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left"> BusNumber</th>
                              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Operation Type</th>
                              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Date</th>
                              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Performed By</th>
                              <th className="w-[158px] h-[56px]  text-[16px]  border-b text-left">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                           
                          {data.map((item,index) => (
                              <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
                                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.OperationID}</td>
                                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.BusNumber}</td>
                                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.OperationType}</td>
                                <td className="w-[143px] h-[56px]  text-[16px]  ">{item.Date}</td>
                                <td className="w-[143px] h-[56px]  text-[16px] px-4 ">{item.PerformedBy}</td>
                                <td className="w-[143px]  h-[56px]  text-[16px]  text-nine  "><span className="bg-eight font-normal p-2 rounded-[8px]">{item.Status }</span></td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div> 
    </div>
  )
}

export default Operation
