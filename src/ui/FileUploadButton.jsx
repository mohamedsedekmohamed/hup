import React, { useState } from 'react';

const FileUploadButton = ({ onFileChange, kind }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(''); 

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; 
    if (selectedFile) {
      const fileType = selectedFile.type.split('/')[0];
      if (fileType === 'image') {  
        setFile(selectedFile); // تخزين الملف في حالة `file`

        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result;  
          if (onFileChange) onFileChange(base64String, kind); // إرسال الـ base64 إلى الدالة `onFileChange`
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
        id="file-upload" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />
      <button
        className='w-[300px] h-[72px] border-1 border-two rounded-[8px] placeholder-seven'
        onClick={() => document.getElementById('file-upload').click()}
      >
        {kind}
      </button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* عرض رسالة الخطأ */}

      {/* عرض الصورة التي تم تحميلها إذا كانت موجودة */}
      {file && (
        <div>
          <img 
            src={URL.createObjectURL(file)} 
            alt="Uploaded Image" 
            width={100} 
            height={100} 
          />
          
        </div>
      )}
    </div>
  );
};

export default FileUploadButton;
