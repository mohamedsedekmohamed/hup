import React from 'react'

const InputField = ({placeholder,value, onChange,name }) => {
  return (
    <div>
<input className='w-[450px] h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-10'      name={name}  
 value={value} onChange={onChange}  placeholder={placeholder}/>

    </div>
  )
}

export default InputField
