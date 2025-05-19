
import React, { useEffect, useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import Header from '@/components/Header';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Capacitor } from '@capacitor/core';
import { Camera } from '@capacitor/camera';

// Define types that won't conflict with existing types
type CameraPermissionState = 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied';

const CameraScreen: React.FC = () => {
  const { isOnline } = useAppContext();
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check permissions when component mounts
    checkCameraPermissions();
  }, []);

  const checkCameraPermissions = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        const permissionStatus = await Camera.checkPermissions();
        setCameraPermission(permissionStatus.camera === 'granted');
        
        // If permission is not granted, request it immediately
        if (permissionStatus.camera !== 'granted') {
          await requestPermissions();
        }
      } else {
        // In web, we'll check permissions when accessing the camera
        setCameraPermission(true);
      }
    } catch (error) {
      console.error('Error checking camera permissions:', error);
      setCameraPermission(false);
    }
  };

  const requestPermissions = async () => {
    try {
      console.log('Requesting camera permissions...');
      const permissionStatus = await Camera.requestPermissions();
      console.log('Permission status:', permissionStatus);
      
      setCameraPermission(permissionStatus.camera === 'granted');
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
      setCameraPermission(false);
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
  
  // Show loading state while checking permissions
  if (cameraPermission === null) {
    return (
      <div className="flex flex-col h-full">
        <Header 
          title={{ en: "Loading Camera", hi: "कैमरा लोड हो रहा है" }}
          showBack={true} 
        />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-8 h-8 border-4 border-cafri-purple-light rounded-full border-t-cafri-purple animate-spin mb-4"></div>
          <p>Checking camera permissions...</p>
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
