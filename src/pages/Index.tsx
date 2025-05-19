
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('Index component mounted');
    console.log('Redirecting to splash screen');
    
    // Redirect to the splash screen
    navigate('/');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-cafri-purple-dark">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        <div className="w-16 h-1 bg-white rounded-full mt-2 mx-auto animate-pulse"></div>
      </div>
    </div>
  );
};

export default Index;
