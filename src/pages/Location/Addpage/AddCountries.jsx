import React from 'react'
import AddAll from '../../../ui/AddAll'
import InputArrow from '../../../ui/InputArrow'
import picdone from '../../../assets/picdone.svg'
import Picdone from '../../../ui/Picdone'
const AddCountries = () => {
  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>

      <AddAll navGo='/Location' name="add Countries"  />

      <InputArrow  like placeholder="Country Name"/>
      <InputArrow like  placeholder="Country Code"/>
      <Picdone src={picdone} navGo='/Location'/>



    </div>
  )
}

export default AddCountries
