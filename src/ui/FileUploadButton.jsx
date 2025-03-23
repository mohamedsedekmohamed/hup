import React, { useState } from 'react';

const FileUploadButton = ({ onFileChange, kind }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(''); 

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; 
    if (selectedFile) {
      const fileType = selectedFile.type.split('/')[0];
      if (fileType === 'image') {  
        setFile(selectedFile); // Store the file in the state

        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result;  
          if (onFileChange) onFileChange(base64String, kind); // Send the base64 string to onFileChange
        };

        reader.readAsDataURL(selectedFile); 
        setError('');  
      } else {
        setError("Please upload a valid image file.");  
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
        className='w-[300px] h-[72px] border-1 border-two rounded-[8px] placeholder-seven'
        onClick={() => document.getElementById(`file-upload-${kind}`).click()}
      >
        {kind}
      </button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}

      {/* Display the uploaded image preview if the file exists */}
      {/* {file && (
        <div>
          <img 
            src={URL.createObjectURL(file)} 
            alt="Uploaded Image" 
            width={100} 
            height={100} 
          />
        </div>
      )} */}
    </div>
  );
};

export default FileUploadButton;
