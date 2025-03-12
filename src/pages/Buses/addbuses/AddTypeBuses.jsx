import React, { useState } from 'react'
import AddAll from '../../../ui/AddAll'
import picdone from '../../../assets/picdone.svg'
import download from '../../../assets/download.svg'
import Picdone from '../../../ui/Picdone'
import InputFiled from '../../../ui/InputField'

const AddTypeBuses = () => {
  const [busImage, setBusImage] = useState(null);
  const [planImage, setPlanImage] = useState(null);
  const [seatsImage, setSeatsImage] = useState(null);

  // دوال لتحميل الصور
  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='ml-6 flex flex-col mt-6 gap-6'>
      <AddAll navGo='/Buses/TypeBuses' name="Add Type Buses " />

      <div className='flex flex-wrap gap-6'>
        <div className='flex flex-col gap-6'>
          <button
            className='flex w-[450px] h-[72px] bg-six justify-center items-center gap-1'
            onClick={() => document.getElementById('bus-image-input').click()}
          >
            <img src={download} alt="Download" />
            <span className='text-[20px] font-medium text-one'>Bus Image</span>
          </button>
          <input
            type="file"
            id="bus-image-input"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleImageChange(e, setBusImage)}
          />
          {busImage && <img src={busImage} alt="Bus" style={{ maxWidth: '150px' }} />}

          {/* زر لتحميل صورة الخطة */}
          <button
            className='flex w-[450px] h-[72px] bg-six justify-center items-center gap-1'
            onClick={() => document.getElementById('plan-image-input').click()}
          >
            <img src={download} alt="Download" />
            <span className='text-[20px] font-medium text-one'>Plan Image</span>
          </button>
          <input
            type="file"
            id="plan-image-input"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleImageChange(e, setPlanImage)}
          />
          {planImage && <img src={planImage} alt="Plan" style={{ maxWidth: '150px' }} />}

          {/* زر لتحميل صورة المقاعد */}
          <button
            className='flex w-[450px] h-[72px] bg-six justify-center items-center gap-1'
            onClick={() => document.getElementById('seats-image-input').click()}
          >
            <img src={download} alt="Download" />
            <span className='text-[20px] font-medium text-one'>Seats Image</span>
          </button>
          <input
            type="file"
            id="seats-image-input"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleImageChange(e, setSeatsImage)}
          />
          {seatsImage && <img src={seatsImage} alt="Seats" style={{ maxWidth: '150px' }} />}
        </div>

        <div className='flex flex-col gap-6'>
          <InputFiled placeholder="Bus Number" />
          <InputFiled placeholder="Bus Number" />
        </div>
      </div>

      <Picdone src={picdone} navGo='/Buses/TypeBuses' />
    </div>
  )
}

export default AddTypeBuses;
