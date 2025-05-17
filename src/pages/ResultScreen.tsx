
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { formatDate, formatDiseaseName, formatLocation } from '@/utils/formatting';
import BoundingBox from '@/components/BoundingBox';
import Header from '@/components/Header';

const ResultScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { diagnoses, diseaseInfo } = useAppContext();
  const navigate = useNavigate();
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [diseaseData, setDiseaseData] = useState(null);

  // Find the diagnosis by id
  const diagnosis = diagnoses.find(d => d.id === id);

  useEffect(() => {
    if (!diagnosis) {
      navigate('/history');
      return;
    }

    if (diagnosis.result?.detections && diagnosis.result.detections.length > 0) {
      const detectedDisease = diagnosis.result.detections[0].label;
      const diseaseInfoData = diseaseInfo.find(d => d.disease === detectedDisease);
      setDiseaseData(diseaseInfoData);
    }
  }, [diagnosis, navigate, diseaseInfo]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageWidth(e.currentTarget.naturalWidth);
    setImageHeight(e.currentTarget.naturalHeight);
  };

  const handleShare = () => {
    // Simulating share functionality
    const message = `Disease detected: ${diagnosis?.result?.detections[0]?.label}\nConfidence: ${Math.round(diagnosis?.result?.detections[0]?.confidence * 100)}%`;
    alert(`Sharing: ${message}`);
  };

  const handleWhatsApp = () => {
    if (!diagnosis) return;
    
    let message = "I need help with a crop disease.";
    
    if (diagnosis.result?.detections && diagnosis.result.detections.length > 0) {
      const detection = diagnosis.result.detections[0];
      message += `\n\nDetected: ${formatDiseaseName(detection.label)}\nConfidence: ${Math.round(detection.confidence * 100)}%`;
    }
    
    if (diagnosis.location) {
      message += `\n\nLocation: https://maps.google.com/?q=${diagnosis.location.latitude},${diagnosis.location.longitude}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    // Open in a new tab/window
    window.open(whatsappUrl, '_blank');
  };

  if (!diagnosis) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title={{ en: "Diagnosis Result", hi: "निदान परिणाम" }}
        showBack={true} 
      />
      
      <div className="flex-1 p-4">
        <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-4">
          <img 
            src={diagnosis.imageUri} 
            alt="Captured crop"
            className="w-full h-auto"
            onLoad={handleImageLoad}
          />
          
          {diagnosis.result?.detections && diagnosis.result.detections.map((detection, index) => (
            <BoundingBox 
              key={index}
              bbox={detection.bbox}
              label={formatDiseaseName(detection.label)}
              confidence={detection.confidence}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
            />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-lg font-bold text-cafri-purple-dark">
                {diagnosis.result?.detections && diagnosis.result.detections.length > 0 
                  ? formatDiseaseName(diagnosis.result.detections[0].label)
                  : "No disease detected"}
              </h2>
              <p className="text-sm text-gray-500">
                {formatDate(diagnosis.timestamp)}
              </p>
            </div>
            <button onClick={handleShare} className="p-2" aria-label="Share">
              <Share2 size={20} className="text-cafri-purple" />
            </button>
          </div>
          
          {diagnosis.result?.detections && diagnosis.result.detections.length > 0 ? (
            <>
              <div className="mb-4">
                <p className="text-sm font-semibold mb-1">Confidence:</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-cafri-purple h-2.5 rounded-full" 
                    style={{width: `${Math.round(diagnosis.result.detections[0].confidence * 100)}%`}}
                  ></div>
                </div>
                <p className="text-right text-xs mt-1">
                  {Math.round(diagnosis.result.detections[0].confidence * 100)}%
                </p>
              </div>
              
              {diseaseData && (
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1">Symptoms:</p>
                  <p className="text-sm text-gray-700">{diseaseData.symptoms.en}</p>
                </div>
              )}
              
              {diseaseData && (
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1">Recommended actions:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {diseaseData.treatments.en.slice(0, 3).map((treatment, index) => (
                      <li key={index}>{treatment}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-cafri-purple mt-1">
                    See more in Knowledge Base
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-700 mb-4">
              No disease detected in this image. The plant appears to be healthy or the affected area may not be clearly visible.
            </p>
          )}
          
          {diagnosis.location && (
            <div>
              <p className="text-xs text-gray-500">
                Location: {formatLocation(diagnosis.location.latitude, diagnosis.location.longitude)}
              </p>
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-4 h-auto"
        >
          Connect with CAFRI Expert via WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default ResultScreen;
