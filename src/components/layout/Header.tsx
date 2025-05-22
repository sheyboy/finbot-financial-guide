
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-xl font-semibold text-financial-dark flex items-center">
              <span className="text-financial-purple">Spend</span>Wise AI
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="outline" size="icon" className="rounded-full">
                <Plus className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
