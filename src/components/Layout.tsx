
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <div className="fixed bottom-16 w-full max-w-md flex justify-center py-2 bg-white border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <p className="text-xs text-gray-400">Powered by</p>
          <img 
            src="/lovable-uploads/c8d32a6a-bea7-4a5f-bf2b-eb996a5d4cb8.png" 
            alt="LAXNAR AI INNOVATIONS" 
            className="h-4"
          />
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
