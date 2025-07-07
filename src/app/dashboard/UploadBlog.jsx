'use client';
import React, { useState } from 'react';

const UploadBlog = () => {
  const [form, setForm] = useState({ title: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Uploading blog:', form);
    alert('Blog uploaded (not really, this is just a placeholder).');
    setForm({ title: '', content: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upload New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Blog Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 border rounded h-40"
          required
        ></textarea>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadBlog;
