import React from 'react'
import AddAll from '../../../ui/AddAll'
import InputArrow from '../../../ui/InputArrow'
import InputField from '../../../ui/InputField'
import picdone from '../../../assets/picdone.svg'
import Picdone from '../../../ui/Picdone'
const Addzones= () => {
  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>

      <AddAll navGo='/Location/Zones' name="add Zones"  />
      <div className='flex flex-wrap gap-6  mt-6'>
        <InputField placeholder="user"/>
      <InputArrow like placeholder="Country Code"/>
      <InputArrow like placeholder="Country Name"/>
      </div>
      <Picdone src={picdone} navGo='/Location/Zones'/> 

     



    </div>
  )
}

export default Addzones
