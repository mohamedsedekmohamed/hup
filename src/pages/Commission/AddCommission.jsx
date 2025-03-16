import React from 'react'
import Picdone from '../../ui/Picdone'
import AddAll from '../../ui/AddAll'
import InputArrow from '../../ui/InputArrow'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
const AddCommission = () => {
  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>

    <AddAll navGo='/Commission' name="add Commission "  />
    <div className='flex flex-wrap gap-6  mt-6'>

    <InputField  placeholder="Complaint ID"/>
    <InputArrow  like placeholder="User Name"/>

    <InputArrow   like placeholder="Subject"/>
    <InputField  placeholder="Date"/>
    </div>

    <Picdone src={picdone} navGo='/Commission'/>
    </div>
  )
}

export default AddCommission
