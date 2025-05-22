
import React from 'react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import FinBot from '@/components/chat/FinBot';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const Chat = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Use effect to handle navigation based on auth state
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Header />
      
      <main className="flex-1 container max-w-md mx-auto px-4 py-6 space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">FinBot Assistant</h1>
        
        <FinBot />
      </main>
      
      <Navigation />
    </div>
  );
};

export default Chat;
