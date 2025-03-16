import React from 'react'
import Picdone from '../../ui/Picdone'
import AddAll from '../../ui/AddAll'
import InputArrow from '../../ui/InputArrow'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
const AddCommissionSetup = () => {
  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>

    <AddAll navGo='/CommissionSetup' name="add AddCommission Setup "  />
    <div className='flex flex-wrap gap-6  mt-6'>

    <InputField  placeholder="Commission ID"/>
    <InputArrow  like placeholder="Agent Name"/>

    <InputArrow   like placeholder="Commission Type"/>
    <InputField  placeholder="Percentage (%)"/>
    </div>

    <Picdone src={picdone} navGo='/Agents' onClick/>


      
    </div>
  )
}

export default AddCommissionSetup
