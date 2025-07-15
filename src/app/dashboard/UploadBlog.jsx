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

  const fileInputRef = useRef(null); // ✅ Added ref

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const categories = [
    'Technology',
    'Finance',
    'Business',
    'Crypto',
    'Sports',
    'Lifestyle',
    'Health',
    'Fashion',
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (content) => {
    setForm((prev) => ({ ...prev, desc: content }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        img: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({
      ...prev,
      img: '',
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // ✅ Reset file input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

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
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setErrorMsg('❌ Failed to upload blog: ' + data.error);
      }
    } catch (error) {
      setErrorMsg('❌ Server error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload New Blog</h2>

      {successMsg && <p className="text-green-600 mb-3">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-3">{errorMsg}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Description
          </label>
          <TinyEditor value={form.desc} onChange={handleDescriptionChange} />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Blog Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded bg-white cursor-pointer"
            disabled={!!form.img}
            required={!form.img}
          />
          {form.img && (
            <div className="relative mt-3 w-full rounded overflow-hidden shadow-md">
              <img
                src={form.img}
                alt="Uploaded preview"
                className="w-full max-h-64 object-cover rounded"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-600 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded cursor-pointer"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>

        {/* Author */}
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author (default: Admin)"
          className="w-full p-3 border border-gray-300 rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? 'Uploading...' : 'Submit Blog'}
        </button>
      </form>
    </div>
  );
};

export default UploadBlog;
