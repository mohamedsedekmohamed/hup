import React, { useState } from 'react';

const FileUploadButton = ({ onFileChange, flag }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(''); // حالة لحفظ رسائل الخطأ

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; 
    if (selectedFile) {
      const fileType = selectedFile.type.split('/')[0];
      if (fileType === 'image') {  // تحقق من أن الملف هو صورة
        setFile(selectedFile);

        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result;  
          if (onFileChange) onFileChange(base64String);  // استدعاء الـ callback لإرجاع الـ Base64
        };

        reader.readAsDataURL(selectedFile);  // تحويل الصورة إلى Base64
        setError('');  // إخفاء رسالة الخطأ عند رفع صورة صحيحة
      } else {
        setError("Please upload a valid image file.");  // عرض رسالة خطأ عند رفع ملف غير صورة
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
        Upload Flag
      </button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* عرض رسالة الخطأ */}

      {flag && (
        <div>
          <img src={flag} alt="Uploaded Flag" width={100} height={100} />
        </div>
      )}
    </div>
  );
};

export default FileUploadButton;