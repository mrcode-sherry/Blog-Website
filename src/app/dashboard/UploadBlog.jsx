'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';

const TinyEditor = dynamic(() => import('@/components/TinyEditor'), { ssr: false });

const UploadBlog = () => {
  const [form, setForm] = useState({
    title: '',
    desc: '',
    img: '',
    category: '',
    author: '',
  });

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const categories = [
    'Technology', 'Finance', 'Business', 'Crypto', 'Sports', 'Lifestyle', 'Health', 'Fashion',
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (content) => {
    setForm((prev) => ({ ...prev, desc: content }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      setErrorMsg("❌ Image too large. Max 1MB allowed.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setErrorMsg('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        setForm((prev) => ({
          ...prev,
          img: data.url,
        }));
        console.log("✅ Uploaded:", data.url);
      } else {
        setErrorMsg('❌ Upload failed: ' + (data.message || 'Unknown error'));
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (err) {
      setErrorMsg('❌ Error: ' + err.message);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, img: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg('✅ Blog uploaded successfully!');
        setForm({
          title: '',
          desc: '',
          img: '',
          category: '',
          author: '',
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setErrorMsg('❌ Failed: ' + data.error);
      }
    } catch (err) {
      setErrorMsg('❌ Server error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload New Blog</h2>

      {successMsg && <p className="text-green-600">{successMsg}</p>}
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full p-3 border rounded"
          required
        />

        <div>
          <label className="text-sm font-medium">Blog Description</label>
          <TinyEditor value={form.desc} onChange={handleDescriptionChange} />
        </div>

        <div>
          <label className="text-sm font-medium">Upload Blog Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            disabled={!!form.img}
            required={!form.img}
          />

          {form.img && (
            <div className="relative mt-4 w-full max-w-md">
              <img src={form.img} alt="Uploaded" className="w-full max-h-72 rounded object-contain" />
              <button
                onClick={handleRemoveImage}
                type="button"
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author (default: Admin)"
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? 'Uploading...' : 'Submit Blog'}
        </button>
      </form>
    </div>
  );
};

export default UploadBlog;
