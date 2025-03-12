import React from 'react'
import AddAll from '../../../ui/AddAll'
import picdone from '../../../assets/picdone.svg'
import Picdone from '../../../ui/Picdone'
import InputFiled from '../../../ui/InputField'
import InputArrow from '../../../ui/InputArrow'
const AddBusesHistory = () => {
  return (
    <div className='ml-6 flex flex-col mt-6 gap-6'>
    <AddAll navGo='/Buses/AddBusesHistory' name="Add Type Buses "  />

    <div className=' flex flex-col  gap-6'>
      <InputFiled placeholder="Bus Number"  />
    <InputArrow like  placeholder="Performed By"/>
    <InputFiled placeholder="Date"  />

      </div>

<Picdone src={picdone} navGo='/Buses/AddBusesHistory'/>



</div>
  )
}

export default AddBusesHistory
