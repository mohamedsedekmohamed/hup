import React from 'react'
import Picdone from '../../ui/Picdone'
import AddAll from '../../ui/AddAll'
import InputArrow from '../../ui/InputArrow'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
const AddCurrency = () => {
    return (
        <div className='ml-6 flex flex-col  mt-6 gap-6'>
    
        <AddAll navGo='/Currency' name="add Currency "  />
        <div className='flex flex-col gap-6  mt-6'>
    
        <InputField  placeholder="Payment Method"/>
        <InputArrow  like placeholder="Currency"/>
    
        <InputArrow   like placeholder="Transaction Fee"/>
        </div>
    
        <Picdone src={picdone} navGo='/Agents' onClick/>
    
    
    </div>
  )
}

export default AddCurrency
