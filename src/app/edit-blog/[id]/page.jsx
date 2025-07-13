'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const TinyEditor = dynamic(() => import('@/components/TinyEditor'), { ssr: false });

const categories = [
  'technology',
  'finance',
  'business',
  'crypto',
  'sports',
  'lifestyle',
  'health',
  'fashion',
];

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    img: '',
    author: '',
    category: 'technology',
  });

  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blog/${id}`);
      const data = await res.json();
      if (data.success) {
        // Normalize category to lowercase
        setFormData({
          ...data.blog,
          category: data.blog.category?.toLowerCase() || 'technology',
        });
        setLoading(false);
      } else {
        alert('Blog not found');
        router.push('/');
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'category' ? value.toLowerCase() : value,
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({ ...prev, desc: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert('✅ Blog updated successfully!');
        router.push('/dashboard');
      } else {
        alert('❌ Update failed: ' + data.error);
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading blog...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded"
        />

        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="p-2 border rounded"
        />

        <input
          name="img"
          value={formData.img}
          onChange={handleChange}
          placeholder="Image URL"
          className="p-2 border rounded"
        />

        {/* Fixed Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Description
          </label>
          <TinyEditor value={formData.desc} onChange={handleDescriptionChange} />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 cursor-pointer duration-300 rounded hover:bg-indigo-700 transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
