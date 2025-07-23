'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { X, Loader2 } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

const TinyEditor = dynamic(() => import('@/components/TinyEditor'), { ssr: false });

const categories = [
  'technology', 'finance', 'business', 'crypto',
  'sports', 'lifestyle', 'health', 'fashion',
];

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const imageRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    img: '',
    author: '',
    category: 'technology',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [scrollImage, setScrollImage] = useState(false);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blog/${id}`);
      const data = await res.json();
      if (data.success) {
        setFormData({
          ...data.blog,
          category: data.blog.category?.toLowerCase() || 'technology',
        });
        setScrollImage(true); // trigger scroll after image loads
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

  useEffect(() => {
    if (scrollImage && formData.img && imageRef.current) {
      // fallback scroll in case onLoad doesn't trigger
      setTimeout(() => {
        imageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
      setScrollImage(false);
    }
  }, [scrollImage, formData.img]);

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
    setSaving(true);
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
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        ⏳ Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 mt-20">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
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

          {/* Image Upload Section */}
          <div>
            <label className="mb-1 text-sm font-medium text-gray-700">Blog Image</label>

            {!formData.img && (
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                onOpen={() => {
                  document.body.style.overflow = 'hidden';
                  setUploadLoading(true);
                }}
                onClose={() => {
                  document.body.style.overflow = 'auto';
                  setTimeout(() => setUploadLoading(false), 500);
                }}
                onSuccess={(result) => {
                  const fileSizeMB = result.info.bytes / (1024 * 1024);
                  if (fileSizeMB > 1) {
                    alert('❌ Image must be smaller than 1MB');
                    setUploadLoading(false);
                    return;
                  }

                  if (result.info.secure_url && result.event === 'success') {
                    setFormData((prev) => ({ ...prev, img: result.info.secure_url }));
                    setScrollImage(true);
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
                    disabled={uploadLoading}
                    className="p-2 border rounded flex items-center justify-center gap-2 cursor-pointer bg-white w-full hover:bg-gray-300 transition"
                  >
                    {uploadLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Opening uploader...
                      </>
                    ) : (
                      'Upload Image'
                    )}
                  </button>
                )}
              </CldUploadWidget>
            )}

            {formData.img && (
              <div ref={imageRef} className="relative mt-3 w-full rounded shadow-md">
                <img
                  src={formData.img}
                  alt="Uploaded"
                  className="w-full max-h-72 object-contain rounded"
                  onLoad={() => {
                    imageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white p-1 duration-200 rounded-full shadow hover:bg-red-600 hover:text-white transition"
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

          {/* Blog Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Description
            </label>
            <TinyEditor value={formData.desc} onChange={handleDescriptionChange} />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 cursor-pointer duration-300 rounded hover:bg-indigo-700 transition mt-4"
          >
            {saving ? 'Updating...' : 'Update Blog'}
          </button>
        </form>
      </div>
    </div>
  );
}
