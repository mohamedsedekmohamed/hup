import React, { useState } from 'react';

const FileUploadButton = ({ onFileChange, kind }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(''); 
  // const [show, showed] = useState(null); 


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; 
    if (selectedFile) {
      const fileType = selectedFile.type.split('/')[0];
      if (fileType === 'image') {  
        setFile(selectedFile); // Store the file in the state

        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result; 
          // showed(base64String); // Show the image preview
          if (onFileChange) onFileChange(base64String, kind); // Send the base64 string to onFileChange
        };

        reader.readAsDataURL(selectedFile); 
        setError('');  
      }
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        id={`file-upload-${kind}`} // Unique ID for each file input
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />
      <button
      
        className='w-[200px] md:w-[300px] h-[48px] md:h-[72px] border-1 border-two rounded-[8px] placeholder-seven pl-5'
        onClick={() => document.getElementById(`file-upload-${kind}`).click()}
      >
        {kind}
      </button>
      {/* {flag && (  <div className='flex justify-center items-center  w-[200px] md:w-[300px] gap-2 mt-2'>
       <img className='w-10 h-10' src={show|| `data:image/png;base64,${show}`}/>
      </div>)}
     */}
      

    
    </div>
  );
};

export default FileUploadButton;
