'use client';
import React, { useEffect, useState } from 'react';

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/dashboard/summary');
        const json = await res.json();
        if (json.success) setStats(json.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center text-sm">Loading Dashboard...</p>;
  if (!stats) return <p className="text-center text-sm text-red-600">Failed to load data.</p>;

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome Admin 👋</h1>
        <p className="text-gray-600">Here's an overview of your blog performance today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Views" value={stats.views} />
        <Card title="Traffic" value={stats.traffic} />
        <Card title="Total Blogs" value={stats.blogs} />
      </div>

      {/* Blogs by Category */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Blogs by Category</h2>
        <ul className="space-y-3">
          {stats.blogsByCategory.map((item) => (
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

      {/* Future Features Section */}
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

const Card = ({ title, value }) => (
  <div className="bg-indigo-600 text-white p-5 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-1">{title}</h2>
    <p className="text-3xl font-bold">{value.toLocaleString()}</p>
  </div>
);

export default DashboardHome;
