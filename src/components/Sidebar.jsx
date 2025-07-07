'use client';
import React from 'react';

const Sidebar = ({ setView, logout, activeView }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-4">
        <button
          onClick={() => setView('home')}
          className={`w-full text-left px-4 py-2 rounded ${activeView === 'home' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setView('upload')}
          className={`w-full text-left px-4 py-2 rounded ${activeView === 'upload' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
        >
          Upload Blog
        </button>
        <button
          onClick={() => setView('manage')}
          className={`w-full text-left px-4 py-2 rounded ${activeView === 'manage' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
        >
          Manage Blogs
        </button>
        <button
          onClick={logout}
          className="w-full mt-10 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
