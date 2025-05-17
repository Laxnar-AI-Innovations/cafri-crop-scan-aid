
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Calendar, Search, Settings } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        <Link 
          to="/home" 
          className={`flex flex-col items-center justify-center w-1/4 h-full ${
            isActive('/home') ? 'text-cafri-purple' : 'text-gray-500'
          }`}
        >
          <Search size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link 
          to="/camera" 
          className={`flex flex-col items-center justify-center w-1/4 h-full ${
            isActive('/camera') ? 'text-cafri-purple' : 'text-gray-500'
          }`}
        >
          <Camera size={24} />
          <span className="text-xs mt-1">Diagnose</span>
        </Link>
        <Link 
          to="/history" 
          className={`flex flex-col items-center justify-center w-1/4 h-full ${
            isActive('/history') ? 'text-cafri-purple' : 'text-gray-500'
          }`}
        >
          <Calendar size={24} />
          <span className="text-xs mt-1">History</span>
        </Link>
        <Link 
          to="/settings" 
          className={`flex flex-col items-center justify-center w-1/4 h-full ${
            isActive('/settings') ? 'text-cafri-purple' : 'text-gray-500'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
