import React from 'react'
import Picdone from '../../ui/Picdone'
import AddAll from '../../ui/AddAll'
import InputArrow from '../../ui/InputArrow'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'

const AddAgents = () => {
  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>

    <AddAll navGo='/Agents' name="add Agents "  />
    <div className='flex flex-wrap gap-6  mt-6'>

    <InputField  placeholder="Agent ID"/>
    <InputArrow  like placeholder="Agent Name"/>

    <InputArrow   like placeholder="Company Name"/>
    <InputField  placeholder="Contact Number"/>
    <InputField  placeholder="Email"/>
    </div>

    <Picdone src={picdone} navGo='/Agents' onClick/>



  </div>
  )
}

export default AddAgents
