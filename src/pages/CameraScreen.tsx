
import React from 'react';
import CameraCapture from '@/components/CameraCapture';
import Header from '@/components/Header';
import { useAppContext } from '@/contexts/AppContext';

const CameraScreen: React.FC = () => {
  const { isOnline } = useAppContext();
  
  return (
    <div className="flex flex-col h-full">
      <Header 
        title={{ en: "Take Photo", hi: "फोटो लें" }}
        showBack={true} 
      />
      
      <div className="flex-1 flex flex-col p-4">
        {!isOnline && (
          <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              You are offline. Photos will be queued for analysis when you're back online.
            </p>
          </div>
        )}
        
        <div className="flex-1 flex flex-col">
          <CameraCapture />
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Tips for best results:</h3>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Ensure good lighting</li>
              <li>Focus on affected areas</li>
              <li>Include both healthy and affected parts</li>
              <li>Keep the camera steady</li>
              <li>Images are analyzed using AI for disease detection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraScreen;
