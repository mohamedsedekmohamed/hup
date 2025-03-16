import React from 'react'
import Picdone from '../../ui/Picdone'
import AddAll from '../../ui/AddAll'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
const AddPayoutAccount = () => {
    return (
        <div className='ml-6 flex flex-col  mt-6 gap-6'>
    
        <AddAll navGo='/PayoutAccount' name="add Payout Account"  />
        <div className='flex flex-col gap-6  mt-6'>
    
        <InputField  placeholder="Name"/>
        <InputField  placeholder="Max Price "/>
        <InputField  placeholder=" Min Price By"/>
    
        </div>
    
        <Picdone src={picdone} navGo='/PayoutAccount' onClick/>
    
        
    </div>
  )
}

export default AddPayoutAccount
