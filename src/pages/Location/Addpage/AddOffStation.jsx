import React from 'react'
import AddAll from '../../../ui/AddAll'
import InputArrow from '../../../ui/InputArrow'
import InputField from '../../../ui/InputField'
import picdone from '../../../assets/picdone.svg'
import Picdone from '../../../ui/Picdone'
import SelectLocatoin from '../../../ui/SelectLocatoin'

const AddOffStation= () => {
  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>

      <AddAll navGo='/Location/Stations' name="add Drop-off"  />
      <div className='flex flex-wrap gap-6  mt-6'>
      <InputField placeholder="Name"/>
      <InputArrow like placeholder=" zone"/>
      <InputArrow like placeholder="City "/>
      <InputArrow like placeholder="Country"/>
      </div>
      <SelectLocatoin/>

      <Picdone src={picdone} navGo='/Location/Stations'/> 

     



    </div>
  )
}

export default AddOffStation
