
import React, { useRef, useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '@/contexts/AppContext';
import { DiagnosisResult } from '@/types';
import { toast } from '@/components/ui/sonner';

const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const { isOnline, addDiagnosis, addPendingImage } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (videoRef.current) {
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }

          const constraints = {
            video: { 
              facingMode: isFrontCamera ? 'user' : 'environment',
              width: { ideal: 1024 },
              height: { ideal: 768 }
            },
            audio: false
          };

          stream = await navigator.mediaDevices.getUserMedia(constraints);
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        toast.error('Could not access camera. Please check permissions.');
        setCameraActive(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setCameraActive(false);
    };
  }, [isFrontCamera]);

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
        // Simulate API request
        setTimeout(() => {
          const mockResult: DiagnosisResult = {
            count: 1,
            detections: [
              {
                label: 'Wheat___Rust',
                confidence: 0.87,
                bbox: [canvas.width * 0.1, canvas.height * 0.2, canvas.width * 0.9, canvas.height * 0.8]
              }
            ],
            inference_ms: 245
          };
          
          const diagnosis = {
            id: diagnosisId,
            imageUri,
            result: mockResult,
            timestamp: Date.now(),
            location: {
              latitude: 25.4581,
              longitude: 78.5795
            },
            isProcessed: true
          };
          
          addDiagnosis(diagnosis);
          navigate(`/result/${diagnosisId}`);
          setIsCapturing(false);
        }, 1500);
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
        setIsCapturing(false);
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      toast.error('Failed to capture image. Please try again.');
      setIsCapturing(false);
    }
  };

  const toggleCamera = () => {
    setIsFrontCamera(prev => !prev);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full aspect-[4/3] bg-black overflow-hidden rounded-lg">
        {cameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-900">
            <p className="text-white">Loading camera...</p>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-6">
        <button
          onClick={toggleCamera}
          disabled={isCapturing}
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
          className="bg-cafri-purple p-5 rounded-full shadow-lg disabled:opacity-50"
          aria-label="Take photo"
        >
          <Camera size={32} className="text-white" />
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
