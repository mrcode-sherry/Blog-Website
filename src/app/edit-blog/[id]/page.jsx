'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

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
  const formRef = useRef(null);
  const buttonRef = useRef(null);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blog/${id}`);
      const data = await res.json();
      if (data.success) {
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

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, img: '' }));
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
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow"
        ref={formRef}
      >
        <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-2 border rounded"
            required
          />

          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="p-2 border rounded"
          />

          {/* Cloudinary Upload Section */}
          <div>
            <label className=" mb-1 text-sm font-medium text-gray-700">
              Blog Image
            </label>

            {!formData.img && (
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                onSuccess={(result) => {
                  if (result.info.secure_url && result.event === 'success') {
                    setFormData((prev) => ({ ...prev, img: result.info.secure_url }));

                    // Scroll to bottom after image uploads
                    setTimeout(() => {
                      buttonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }, 500);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      open();
                    }}
                    className="p-2 border rounded bg-white w-full hover:bg-gray-100 transition"
                  >
                    Upload Image
                  </button>
                )}
              </CldUploadWidget>
            )}

            {formData.img && (
              <div className="relative mt-3 w-full rounded shadow-md">
                <img
                  src={formData.img}
                  alt="Selected preview"
                  className="w-full max-h-72 object-contain rounded"
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

          {/* Category Dropdown */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Description Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Description
            </label>
            <TinyEditor value={formData.desc} onChange={handleDescriptionChange} />
          </div>

          <button
            type="submit"
            ref={buttonRef}
            className="bg-indigo-600 text-white px-4 py-2 cursor-pointer duration-300 rounded hover:bg-indigo-700 transition mt-4"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}
