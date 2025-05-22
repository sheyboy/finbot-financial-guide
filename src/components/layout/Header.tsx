
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-financial-dark flex items-center">
            <span className="text-financial-purple">Spend</span>Wise AI
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
