
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
