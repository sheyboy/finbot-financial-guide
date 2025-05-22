
import React from 'react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import FinBot from '@/components/chat/FinBot';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Chat = () => {
  const { user, loading } = useAuth();

  // Redirect to login if not authenticated
  if (!loading && !user) {
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
