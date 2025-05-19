
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('SplashScreen mounted');
    console.log('Capacitor platform:', Capacitor.getPlatform());
    
    const loadApp = async () => {
      try {
        // Simulate initialization process
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('SplashScreen: Navigating to home screen');
        navigate('/home', { replace: true });
      } catch (err) {
        console.error('SplashScreen error:', err);
        setError('Failed to initialize app. Please restart.');
      }
    };
    
    loadApp();
    
    // Fallback in case navigation doesn't work
    const fallbackTimer = setTimeout(() => {
      console.log('SplashScreen: Fallback navigation triggered');
      navigate('/home', { replace: true });
    }, 5000);
    
    return () => {
      console.log('SplashScreen unmounting');
      clearTimeout(fallbackTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cafri-purple-dark">
      <div className="w-32 h-32 mb-6 bg-white rounded-full flex items-center justify-center">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9H9.01" stroke="#9b87f5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 9H15.01" stroke="#9b87f5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 8L6 10" stroke="#ea384c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 8L18 10" stroke="#ea384c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2V4" stroke="#F2FCE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-white mb-3">CAFRI</h1>
      <h2 className="text-2xl font-semibold text-white">Crop Doctor</h2>
      
      {error && (
        <div className="mt-8 bg-red-500/20 border border-red-500 rounded-md p-3">
          <p className="text-white">{error}</p>
        </div>
      )}
      
      <div className="absolute bottom-8 flex flex-col items-center">
        <p className="text-white text-sm mb-2">Instant Disease Diagnosis</p>
        <div className="w-16 h-1 bg-white rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
