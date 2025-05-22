
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChartBar, Wallet, Settings } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t">
      <div className="flex h-16 items-center justify-around">
        <NavItem icon={<Home className="h-5 w-5" />} label="Home" to="/" active={true} />
        <NavItem icon={<ChartBar className="h-5 w-5" />} label="Stats" to="/stats" />
        <NavItem icon={<Wallet className="h-5 w-5" />} label="Budget" to="/budget" />
        <NavItem icon={<Settings className="h-5 w-5" />} label="Settings" to="/settings" />
      </div>
    </nav>
  );
};

const NavItem = ({ 
  icon, 
  label, 
  to, 
  active = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  to: string; 
  active?: boolean;
}) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center w-16 h-16 ${
        active ? 'text-financial-purple' : 'text-financial-gray'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default Navigation;
