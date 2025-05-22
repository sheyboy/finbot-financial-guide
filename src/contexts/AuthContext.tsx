
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
      }
    );

    // Then get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log('Initial session:', initialSession ? 'exists' : 'none');
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast({ 
        title: "Success", 
        description: "Account created! Please check your email for verification." 
      });
    } catch (error: any) {
      console.error('Signup error:', error.message);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to sign up", 
        variant: "destructive" 
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: "Success", description: "Logged in successfully" });
    } catch (error: any) {
      console.error('Login error:', error.message);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to sign in", 
        variant: "destructive" 
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: "Success", description: "Signed out successfully" });
    } catch (error: any) {
      console.error('Signout error:', error.message);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to sign out", 
        variant: "destructive" 
      });
      throw error;
    }
  };

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
