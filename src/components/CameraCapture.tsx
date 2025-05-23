import React, { useRef, useState, useEffect } from 'react';
import { Camera as CameraIcon, AlertTriangle, CameraOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/sonner';
import { uploadImageForPrediction } from '@/services/predictionService';
import { Button } from '@/components/ui/button';
import { Capacitor } from '@capacitor/core';

interface CameraCaptureProps {
  requestCameraPermission?: () => Promise<void>;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ requestCameraPermission }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isOnline, addDiagnosis, addPendingImage } = useAppContext();
  const navigate = useNavigate();
  const [cameraInitAttempts, setCameraInitAttempts] = useState(0);

  useEffect(() => {
    console.log('CameraCapture component mounted');
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (videoRef.current) {
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }

          console.log('Attempting to access webcam...');
          const constraints = {
            video: { 
              facingMode: isFrontCamera ? 'user' : 'environment'
              // Removing width & height constraints to allow more flexible resolution
            },
            audio: false
          };

          console.log('Webcam constraints:', constraints);
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          
          console.log('Webcam access successful, setting video source');
          videoRef.current.srcObject = stream;
          setCameraActive(true); // Set camera active as soon as we get a stream

          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded');
            if (videoRef.current) {
              videoRef.current.play()
                .then(() => {
                  console.log('Video playback started successfully');
                })
                .catch(e => {
                  console.error('Video playback failed:', e);
                  setError('Failed to start video playback.');
                });
            }
          };
          setError(null);
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
        
        // Try to differentiate between permission errors and other camera issues
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.log('Camera error message:', errorMessage);
        
        if (errorMessage.toLowerCase().includes('permission') || 
            errorMessage.toLowerCase().includes('denied') ||
            errorMessage.toLowerCase().includes('not allowed')) {
          setError('Camera permission denied. Please grant camera permissions in your browser settings.');
          
          // If we have a permission request function, offer to request permission
          if (requestCameraPermission) {
            console.log('Requesting camera permission from CameraCapture component');
            try {
              await requestCameraPermission();
              // After requesting permission, increment attempts to trigger useEffect again
              setCameraInitAttempts(prev => prev + 1);
            } catch (permError) {
              console.error('Error requesting permission:', permError);
            }
          }
        } else {
          setError('Could not access camera. Please check your device and try again.');
        }
        
        setCameraActive(false);
      }
    };

    console.log('Starting camera initialization...');
    startCamera();

    return () => {
      console.log('CameraCapture component unmounting, stopping camera');
      if (stream) {
        stream.getTracks().forEach(track => {
          console.log('Stopping track:', track.kind);
          track.stop();
        });
      }
      setCameraActive(false);
    };
  }, [isFrontCamera, requestCameraPermission, cameraInitAttempts]);

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return;
    
    setIsCapturing(true);
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Could not get canvas context');
      }
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data as base64 string
      const imageUri = canvas.toDataURL('image/jpeg', 0.8);
      
      const diagnosisId = uuidv4();
      
      if (isOnline) {
        try {
          // Send to real API and get actual results
          const result = await uploadImageForPrediction(imageUri);
          
          const diagnosis = {
            id: diagnosisId,
            imageUri,
            result,
            timestamp: Date.now(),
            location: {
              latitude: 25.4581,
              longitude: 78.5795
            },
            isProcessed: true
          };
          
          addDiagnosis(diagnosis);
          navigate(`/result/${diagnosisId}`);
        } catch (error) {
          console.error('Error processing image:', error);
          toast.error('Failed to analyze image. Please try again.');
          
          // Save the image to pending queue if API fails
          addPendingImage(imageUri);
          
          const diagnosis = {
            id: diagnosisId,
            imageUri,
            timestamp: Date.now(),
            isProcessed: false
          };
          
          addDiagnosis(diagnosis);
          navigate('/history');
        }
      } else {
        // Offline mode - queue the image
        addPendingImage(imageUri);
        toast.info('Image saved to queue. It will be processed when you\'re back online.');
        
        const diagnosis = {
          id: diagnosisId,
          imageUri,
          timestamp: Date.now(),
          isProcessed: false
        };
        
        addDiagnosis(diagnosis);
        navigate('/history');
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      toast.error('Failed to capture image. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleCamera = () => {
    setIsFrontCamera(prev => !prev);
  };

  const retryCamera = async () => {
    setError(null);
    
    // If permission request function available, try requesting permissions
    if (requestCameraPermission) {
      try {
        console.log('Requesting camera permission on retry');
        await requestCameraPermission();
      } catch (err) {
        console.error('Error requesting permission on retry:', err);
      }
    }
    
    // Increment the attempt counter to trigger the useEffect again
    setCameraInitAttempts(prev => prev + 1);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full aspect-[4/3] bg-black overflow-hidden rounded-lg">
        {error ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-900 text-white p-4">
            <CameraOff size={32} className="text-red-500 mb-2" />
            <p className="text-center mb-4">{error}</p>
            <Button onClick={retryCamera} variant="default">
              Retry Camera Access
            </Button>
          </div>
        ) : cameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-900">
            <div className="w-8 h-8 border-4 border-gray-300 rounded-full border-t-white animate-spin mb-2"></div>
            <p className="text-white mt-4">Loading camera...</p>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-6">
        <button
          onClick={toggleCamera}
          disabled={!cameraActive || isCapturing}
          className="bg-white p-3 rounded-full shadow-lg disabled:opacity-50"
          aria-label="Switch camera"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5"></path><path d="M8 21h-5v-5"></path>
            <path d="M21 16v5h-5"></path><path d="M3 8v-5h5"></path>
            <path d="M10 7l4 10"></path><path d="M10 17l4-10"></path>
          </svg>
        </button>

        <button
          onClick={captureImage}
          disabled={!cameraActive || isCapturing}
          className={`bg-cafri-purple p-5 rounded-full shadow-lg ${!cameraActive ? 'opacity-50' : ''}`}
          aria-label="Take photo"
        >
          <CameraIcon size={32} className="text-white" />
        </button>

        <div className="w-12"></div> {/* Placeholder for balance */}
      </div>

      {isCapturing && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-center">Processing...</p>
            <div className="w-12 h-1 bg-cafri-purple-light mt-2 rounded-full animate-pulse mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
