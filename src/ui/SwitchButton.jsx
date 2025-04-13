import React from 'react';
import styled from 'styled-components';

const SwitchButton = ({ value, setValue, num, title }) => {
  const kind = num ? "checkbox" : "";
// useEffect(()=>{
//   console.log(value)

// },[value])
  const toggleValue = () => {
    if (num) {
      setValue(value === "0" ? "1" : "0");
    } else {
      setValue(value === "active" ? "inactive" : "active");
    }
  };

  return (
    <div className='flex items-center gap-2'>
      {num ? (
        <StyledWrapper>
          <span>{title ?title:"statue"} </span>
          <label className="switch">
            <input  
              type={kind}
              checked={value === "1"||value===1}  // تحقق من أن القيمة هي 1
              onChange={toggleValue} 
              className="mr-2" 
            />
            <span className="slider" />
          </label>
        </StyledWrapper>
      ) : (
        <StyledWrapper>
          <span>statue </span>
          <label className="switch">
            <input  
              type="checkbox"
              checked={value === "active"} // تحقق من أن القيمة هي active
              onChange={toggleValue} 
              className="mr-2" 
            />
            <span className="slider" />
          </label>
        </StyledWrapper>
      )}
    </div>
  );
};

export default SwitchButton;

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: white;
    border-radius: 50px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.215, 0.610, 0.355, 1);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    right: 0.3em;
    bottom: 0.3em;
    transform: translateX(150%);
    background-color: #59d102;
    border-radius: inherit;
    transition: all 0.4s cubic-bezier(0.215, 0.610, 0.355, 1);
  }

  .slider:after {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    left: 0.3em;
    bottom: 0.3em;
    background-color: #cccccc;
    border-radius: inherit;
    transition: all 0.4s cubic-bezier(0.215, 0.610, 0.355, 1);
  }

  .switch input:focus + .slider {
    box-shadow: 0 0 1px #59d102;
  }

  .switch input:checked + .slider:before {
    transform: translateY(0);
  }

  .switch input:checked + .slider::after {
    transform: translateX(-150%);
  }
`;
