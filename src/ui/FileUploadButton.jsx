import React, { useState } from 'react';

const FileUploadButton = ({ onFileChange, kind }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(''); 
  const [showed, setShowed] = useState(null); // State to store base64 preview

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; 
    if (selectedFile) {
      const fileType = selectedFile.type.split('/')[0];
      if (fileType === 'image') {  
        setFile(selectedFile); // Store the file

        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result;
          setShowed(base64String); // ✅ Show the preview
          if (onFileChange) {
            onFileChange(base64String, kind); // ✅ Send base64 to parent
          }
        };

        reader.readAsDataURL(selectedFile); 
        setError('');  
      } else {
        setError('Please upload an image file only');
      }
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        id={`file-upload-${kind}`} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />

      <button
        className='w-[200px] md:w-[300px] h-[48px] md:h-[72px] border border-two rounded-[8px] pl-5'
        onClick={() => document.getElementById(`file-upload-${kind}`).click()}
      >
        {kind}
      </button>

      {showed && (
        <div className='flex justify-center items-center w-[200px] md:w-[300px] gap-2 mt-2'>
          <img className='w-10 h-10 object-cover rounded' src={showed} alt="Preview" />
        </div>
      )}

      {error && (
        <div className='text-red-500 text-sm mt-1'>{error}</div>
      )}
    </div>
  );
};

export default FileUploadButton;
