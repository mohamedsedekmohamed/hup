import React from 'react';

const SwitchButton = ({value,setValue}) => {

  const toggleValue = () => {
    setValue(value === "active" ? "inactive" : "active");  
  };

  return (
    <div>
      <button 
        onClick={toggleValue} 
        className='w-[300px] h-[72px] border-1 text-[25px] font-medium border-two rounded-[8px] placeholder-seven '
      >
        {value === "active"  ? "on" : " off"} 
      </button>

      
    </div>
  );
};

export default SwitchButton;
