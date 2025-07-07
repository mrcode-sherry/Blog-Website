'use client';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      return router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // avoid flashing dashboard

  return children;
};

export default PrivateRoute;
