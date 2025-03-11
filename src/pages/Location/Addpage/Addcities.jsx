import React from 'react'
import AddAll from '../../../ui/AddAll'
import InputArrow from '../../../ui/InputArrow'
import picdone from '../../../assets/picdone.svg'
import Picdone from '../../../ui/Picdone'
const AddCities = () => {
  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>

      <AddAll navGo='/Location/Cities' name="add  Cities"  />
      <InputArrow like  placeholder="Country Name"/>
      <InputArrow like placeholder="Country"/>
      <Picdone src={picdone} navGo='/Location/Cities'/>



    </div>
  )
}

export default AddCities
