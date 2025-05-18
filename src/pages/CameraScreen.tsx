
import React, { useEffect, useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Header from '@/components/Header';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Capacitor } from '@capacitor/core';

const CameraScreen: React.FC = () => {
  const { isOnline } = useAppContext();
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // Check camera permissions on native platforms
      checkCameraPermissions();
    } else {
      // In web, we'll check permissions when accessing the camera
      setCameraPermission(true);
    }
  }, []);

  const checkCameraPermissions = async () => {
    try {
      // Dynamically import the permission plugin (only needed on native)
      const { Camera } = await import('@capacitor/camera');
      const permissionStatus = await Camera.checkPermissions();
      
      setCameraPermission(permissionStatus.camera === 'granted');
    } catch (error) {
      console.error('Error checking camera permissions:', error);
      setCameraPermission(false);
    }
  };

  const requestPermissions = async () => {
    try {
      const { Camera } = await import('@capacitor/camera');
      const permissionStatus = await Camera.requestPermissions();
      
      setCameraPermission(permissionStatus.camera === 'granted');
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
    }
  };

  // Render permission screen if permission is explicitly denied
  if (cameraPermission === false) {
    return (
      <div className="flex flex-col h-full">
        <Header 
          title={{ en: "Camera Permission", hi: "कैमरा अनुमति" }}
          showBack={true} 
        />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">Camera Permission Required</h2>
            <p className="text-gray-600 mb-4">
              This app needs camera access to identify crop diseases. Please grant camera permission.
            </p>
          </div>
          <Button onClick={requestPermissions} className="bg-cafri-purple">
            Grant Camera Permission
          </Button>
        </div>
      </div>
    );
  }
  
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
          <CameraCapture requestCameraPermission={requestPermissions} />
          
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
