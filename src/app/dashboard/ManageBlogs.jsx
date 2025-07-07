'use client';
import React from 'react';

const ManageBlogs = () => {
  const blogs = [
    { id: 1, title: 'My First Blog' },
    { id: 2, title: 'Learning React' },
    { id: 3, title: 'Next.js Tips' },
  ];

  const handleDelete = (id) => {
    alert(`Blog with ID ${id} deleted (not really, just demo).`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Blogs</h2>
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <span>{blog.title}</span>
            <button
              onClick={() => handleDelete(blog.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBlogs;
