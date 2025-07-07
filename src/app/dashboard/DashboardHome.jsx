'use client';
import React from 'react';

const DashboardHome = () => {
  const totalStats = {
    views: 12034,
    likes: 5432,
    traffic: 7811,
    blogs: 28,
  };

  const blogsByCategory = [
  { category: 'Technology', count: 12 },
  { category: 'Finance', count: 9 },
  { category: 'Business', count: 8 },
  { category: 'Crypto', count: 4 },
  { category: 'Sports', count: 6 },
  { category: 'Lifestyle', count: 11 },
  { category: 'Health', count: 7 },
  { category: 'Fashion', count: 6 },
];


  return (
    <div className="space-y-10">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome Admin 👋</h1>
        <p className="text-gray-600">Here's an overview of your blog performance today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-indigo-600 text-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-1">Total Views</h2>
          <p className="text-3xl font-bold">{totalStats.views.toLocaleString()}</p>
        </div>
        <div className="bg-green-600 text-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-1">Total Likes</h2>
          <p className="text-3xl font-bold">{totalStats.likes.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-500 text-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-1">Traffic</h2>
          <p className="text-3xl font-bold">{totalStats.traffic.toLocaleString()}</p>
        </div>
        <div className="bg-purple-600 text-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-1">Total Blogs</h2>
          <p className="text-3xl font-bold">{totalStats.blogs}</p>
        </div>
      </div>

      {/* Blogs by Category */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Blogs by Category</h2>
        <ul className="space-y-3">
          {blogsByCategory.map((item) => (
            <li
              key={item.category}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="font-medium text-gray-700">{item.category}</span>
              <span className="text-indigo-600 font-bold">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Future Add-ons Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Next Steps</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Add Recent Activity Feed</li>
          <li>Implement Blog Analytics</li>
          <li>Setup Comment Moderation</li>
          <li>Connect Google Analytics / Mailchimp</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
