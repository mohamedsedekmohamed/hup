import React, { useRef, useState } from 'react';
import ThreeThing from '../../component/ThreeThing';
import styled from 'styled-components';

const WalletRequsts = () => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const ref = useRef(null);
  
    const showAlert = () => {
      setIsAlertVisible(true);
    };
  
    const closeAlert = () => {
      setIsAlertVisible(false);
    };
  
  const data = [
    {
      RequestID: "WR-1001",
      UserName: "Ahmed Khaled",
      RequestedAmount: "500 SAR",
      CurrentWalletBalance: "1,200 SAR",
      RequestDate: '2025-03-05',
      Withdraw: "done",
      Status: "Reject",
      Action: "",
    },
    {
      RequestID: "WR-1001",
      UserName: "Ahmed Khaled",
      RequestedAmount: "500 SAR",
      CurrentWalletBalance: "1,200 SAR",
      RequestDate: '2025-03-05',
      Withdraw: "done",
      Status: "Reject",
      Action: "",
    },
    {
      RequestID: "WR-1001",
      UserName: "Ahmed Khaled",
      RequestedAmount: "500 SAR",
      CurrentWalletBalance: "1,200 SAR",
      RequestDate: '2025-03-05',
      Withdraw: "done",
      Status: "Reject",
      Action: "",
    },
  ];

  return (
    <div className='relative flex justify-center items-end '>
      <div
        ref={ref}
        className={`absolute top-0 w-200 h-50   bg-white z-10 ${isAlertVisible ? "block" : "hidden"} flex items-center justify-center`}  
      >
        <div className='flex-col'>

        <span> Are you sure you want to confirm
        the withdrawal of 500 EGP?</span>
        <div className='flex gap-2 mt-10 justify-between'> 
          
        <button className='bg-three w-[149px] h-[48px] text-white rounded-lg' onClick={closeAlert}>Confirm </button>
        <button className='border-three w-[149px] h-[48px] text-black border rounded-lg' onClick={closeAlert}>Cancellation </button>
        </div>
        </div>
      </div>

      <div>
        <ThreeThing like navGo='/AddTrips' />
        <div className="mt-10 ml-5">
          <table className="w-full border-y border-black">
            <thead className="w-full">
              <tr className='bg-four w-[1012px] h-[56px]'>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Request ID</th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Buses&Trains</th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">RequestedAmount</th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Current WalletBalance</th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Request Date</th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Withdraw</th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Status</th>
                <th className="w-[158px] h-[56px] text-[16px] border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className='border-y relative hover:bg-six hover:border-y-2'>
                  <td className="w-[143px] h-[56px] text-[16px] px-4">{item.RequestID}</td>
                  <td className="w-[143px] h-[56px] text-[16px] px-4">{item.UserName}</td>
                  <td className="w-[143px] h-[56px] text-[16px] px-4">{item.RequestedAmount}</td>
                  <td className="w-[143px] h-[56px] text-[16px] px-4">{item.CurrentWalletBalance}</td>
                  <td className="w-[143px] h-[56px] text-[16px] px-4">{item.RequestDate}</td>
                  <td className="w-[143px] h-[56px] text-[16px] px-4">
                    <button onClick={showAlert} className='bg-three py-1 px-2 rounded-[8px] text-white'>
                      {item.Withdraw}
                    </button>
                  </td>
                  <td className="w-[143px] h-[56px] text-[16px] text-twelve">
                    <span className="bg-eight font-normal p-2 rounded-[8px]">{item.Status}</span>
                  </td>
                  <td className="w-[143px] h-[56px] text-[16px] flex items-center gap-0.5">
                    <span>Accept</span>
                    <div className='flex my-auto'>
                      <StyledWrapper>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider" />
                        </label>
                      </StyledWrapper>
                    </div>
                    <span>Reject</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 31px;
    height: 17px;
  }

  .switch input {
    opacity: 1;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    transition: .4s;
    border-radius: 30px;
    border: 1px solid #ccc;
  }

  /* The slider's circle */
  .slider:before {
    position: absolute;
    content: "";
    height: 1em; /* تقليل حجم الدائرة */
    width: 1em; /* تقليل حجم الدائرة */
    border-radius: 50%; /* يجعلها دائرة */
    left: 1px; /* تحريكها قليلًا لتتناسب مع الحجم الجديد */
    top: 0;
    background-color: white;
    box-shadow: 0 2px 5px #999999;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #5fdd54;
    border: 1px solid transparent;
  }

  input:checked + .slider:before {
    transform: translateX(0.8em); /* تحريك الدائرة عند التبديل */
  }
`;

export default WalletRequsts;
