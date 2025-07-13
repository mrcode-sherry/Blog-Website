'use client';
import { useState } from 'react';
import PrivateRoute from '@/components/PrivateRoute';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import DashboardHome from './DashboardHome';
import UploadBlog from './UploadBlog';
import ManageBlogs from './ManageBlogs';

const Dashboard = () => {
  const { logout } = useAuth();
  const [view, setView] = useState('home'); // default view

  const renderView = () => {
    switch (view) {
      case 'upload':
        return <UploadBlog />;
      case 'manage':
        return <ManageBlogs />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen flex bg-gray-100 mt-20">
        {/* Sidebar */}
        <div className='pt-4 bg-[#1E2939]'>
          <Sidebar setView={setView} logout={logout} activeView={view} />
        </div>

        {/* Main View */}
        <main className="flex-1 p-8">{renderView()}</main>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
