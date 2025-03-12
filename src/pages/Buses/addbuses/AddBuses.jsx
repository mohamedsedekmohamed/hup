import React from 'react'
import AddAll from '../../../ui/AddAll'
import InputArrow from '../../../ui/InputArrow'
import picdone from '../../../assets/picdone.svg'
import Picdone from '../../../ui/Picdone'
import InputFiled from '../../../ui/InputField'
const AddBuses = () => {
  return (
    <div className='ml-6 flex flex-col mt-6 gap-6'>
            <AddAll navGo='/Buses' name="add Buses"  />

      <div className=' flex flex-wrap  gap-6'>
      <InputFiled placeholder="Bus Number"  />
    <InputArrow like  placeholder="Bus Type"/>
    <InputArrow like  placeholder="Capacity"/>
    <InputArrow like  placeholder="Operator (Agent)"/>
    <InputArrow like placeholder="Route"/>
      </div>
      
      <Picdone src={picdone} navGo='/Buses'/>



  </div>
  )
}

export default AddBuses
