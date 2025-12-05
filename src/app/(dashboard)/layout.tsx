'use client';
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import Header from '@/components/Dashboard/Header/Header';
import './globals.scss';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  
  useLayoutEffect(() => {
    if (!isAuthenticated && isAuthenticated !== null) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <div className="dashboard-layout">
        <Header />
      <main className="dashboard-main">
      <Sidebar />
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}
