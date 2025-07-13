'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the TinyEditor component (with no SSR to avoid hydration errors)
const TinyEditor = dynamic(() => import('@/components/TinyEditor'), { ssr: false });

const UploadBlog = () => {
  const [form, setForm] = useState({
    title: '',
    desc: '',
    img: '',
    category: '',
    author: '',
  });

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

        {/* TinyMCE Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Description
          </label>
          <TinyEditor value={form.desc} onChange={handleDescriptionChange} />
        </div>

        {/* Image URL */}
        <input
          type="text"
          name="img"
          value={form.img}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
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

        {/* Submit Button */}
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
