import React from 'react';

const SwitchButton = ({ value, setValue, num ,title}) => {
  const kind = num ? "checkbox" : "";

  const toggleValue = () => {
    if (num) {
      setValue(value === "0" ? "1" : "0");  
    } else {
      setValue(value === "active" ? "inactive" : "active");
    }
  };

  return (
    <div>
      {num ? (
        <label className='w-[300px] h-[72px] border-1 text-[25px] font-medium border-two rounded-[8px] placeholder-seven'>
          <input 
            type={kind}
            checked={value === "1"} 
            onChange={toggleValue} 
            className="mr-2" 
          />
     {title}     {value === "1" ? "On" : "Off"}
        </label>
      ) : (
        // Render a button if 'num' is false
        <button 
          onClick={toggleValue} 
          className='w-[300px] h-[72px] border-1 text-[25px] font-medium border-two rounded-[8px] placeholder-seven'>
       {`status ${value === "active" ? "inactive" : "active"}`}   
        </button>
      )}
    </div>
  );
};

export default SwitchButton;
