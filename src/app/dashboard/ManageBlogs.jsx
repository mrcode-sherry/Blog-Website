'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function ManageBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Technology');
  const router = useRouter();

  // ✅ Fetch all blogs (no backend filter)
  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      if (data.success) {
        setAllBlogs(data.blogs);
        filterByCategory(data.blogs, 'Technology'); // default filter
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  // ✅ Filter blogs on client
  const filterByCategory = (blogs, category) => {
    const filtered = blogs.filter(
      (blog) =>
        blog.category &&
        blog.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredBlogs(filtered);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterByCategory(allBlogs, selectedCategory);
  }, [selectedCategory]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        alert('Blog deleted');
        fetchBlogs(); // refresh
      } else {
        alert('Failed to delete blog');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit-blog/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Blogs</h2>

      {/* 🔽 Category Filter */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* 📄 Blog List */}
      <div className="grid gap-6">
        {filteredBlogs.length === 0 ? (
          <p>No blogs found in this category.</p>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={blog.img || '/default.png'}
                  alt="Blog"
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg">{blog.title}</h3>
                  <p className="text-sm text-gray-500">
                    Uploaded: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer duration-300 hover:bg-indigo-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 text-white px-3 py-1 cursor-pointer duration-300 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
