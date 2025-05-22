
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-financial-purple text-6xl font-bold mb-4">404</div>
        <h1 className="text-2xl font-bold text-financial-dark">Page Not Found</h1>
        <p className="text-financial-gray mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-financial-purple hover:bg-financial-purple/90">
          <Link to="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
