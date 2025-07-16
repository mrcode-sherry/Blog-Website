'use client';
import { useState } from 'react';

export default function ImageUploader() {
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result;
      setBase64(base64String);
      setPreview(base64String);

      // Send to backend (optional)
      setLoading(true);
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64String }),
      });
      const result = await res.json();
      setLoading(false);

      alert(result.message);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {preview && <img src={preview} alt="Preview" className="w-64 mt-4" />}
      {loading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
    </div>
  );
}
