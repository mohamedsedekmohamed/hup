import React from 'react'
import AddAll from '../../ui/AddAll'
import InputArrow from '../../ui/InputArrow'
import InputField from '../../ui/InputField'
import picdone from '../../assets/picdone.svg'
import Picdone from '../../ui/Picdone'
const AddTrips = () => {
  return (
    <div className='ml-6 flex flex-col  mt-6 gap-6'>
        <AddAll navGo='/Trips' name='add Trips'/>
        <div className='flex flex-wrap gap-6  mt-6'>
        <InputField placeholder="Trip ID"/>
        <InputArrow placeholder="Bus Name"/>
        <InputArrow placeholder="Pick-up Point"/>
        <InputArrow placeholder="Drop-off Point"/>
        <InputArrow placeholder="City"/>
        <InputArrow placeholder="Zone"/>
        <InputArrow placeholder="TripDeparture TimeID"/>
        <InputArrow placeholder="Arrival Time"/>
        <InputArrow placeholder="TripAvailable SeatsID"/>
        <InputArrow placeholder="Price"/>
        </div>
        <Picdone src={picdone} navGo='/Trips'/> 

    </div>
  )
}

export default AddTrips
