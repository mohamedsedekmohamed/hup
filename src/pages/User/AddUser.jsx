import React from 'react'
import picdone from '../../assets/picdone.svg'
import AddAll from '../../ui/AddAll';
import InputField from '../../ui/InputField';
import InputArrow from '../../ui/InputArrow';
import Picdone from '../../ui/Picdone';
 const AddUser = () => {

  return (  
    <div className='ml-6'>
   <AddAll navGo='/User' name="Add User"/>
    <div className='flex flex-wrap gap-6  mt-6'>
        <InputField placeholder="Phone"/>
        <InputField placeholder="Name"/>
        <InputArrow placeholder="Country"/>
        <InputArrow placeholder="Cities"/>
        <InputArrow placeholder="Zones"/>
        
     </div>
      <Picdone src={picdone} navGo='/User'/>
        
    
    </div>
  )
}

export default AddUser

