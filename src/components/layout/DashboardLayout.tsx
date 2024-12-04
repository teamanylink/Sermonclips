import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { signOut } from '../../lib/supabase/auth';
import { toast } from 'react-hot-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}