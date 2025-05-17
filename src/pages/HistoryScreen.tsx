
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { formatDate } from '@/utils/formatting';
import Header from '@/components/Header';

const HistoryScreen: React.FC = () => {
  const { diagnoses, pendingImages, language } = useAppContext();
  
  const exportCSV = () => {
    // Create CSV content
    const headers = 'ID,Date,Disease,Confidence,Latitude,Longitude\n';
    const rows = diagnoses
      .filter(d => d.isProcessed)
      .map(d => {
        const disease = d.result?.detections && d.result.detections.length > 0 
          ? d.result.detections[0].label.replace('___', ' ') 
          : 'No disease';
        const confidence = d.result?.detections && d.result.detections.length > 0 
          ? Math.round(d.result.detections[0].confidence * 100) 
          : 0;
        const lat = d.location?.latitude || '';
        const lng = d.location?.longitude || '';
        const date = new Date(d.timestamp).toISOString();
        
        return `${d.id},${date},${disease},${confidence}%,${lat},${lng}`;
      })
      .join('\n');
    
    const csvContent = headers + rows;
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cafri_crop_diagnoses.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title={{ en: "Diagnosis History", hi: "निदान इतिहास" }}
      />
      
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">
            {language === 'en' ? 'All diagnoses' : 'सभी निदान'}
          </h1>
          <button 
            onClick={exportCSV}
            className="text-sm text-cafri-purple bg-cafri-purple-light bg-opacity-20 px-3 py-1 rounded"
          >
            {language === 'en' ? 'Export CSV' : 'CSV निर्यात करें'}
          </button>
        </div>
        
        {pendingImages.length > 0 && (
          <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <h3 className="text-sm font-medium mb-2">
              {language === 'en' ? 'Pending diagnoses' : 'लंबित निदान'} ({pendingImages.length})
            </h3>
            <p className="text-xs text-amber-800">
              {language === 'en' 
                ? 'These images will be processed when you are back online' 
                : 'आपके ऑनलाइन होने पर इन छवियों को संसाधित किया जाएगा'}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          {diagnoses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {language === 'en' 
                  ? 'No diagnoses yet. Start by taking a photo!' 
                  : 'अभी तक कोई निदान नहीं। फोटो लेकर शुरू करें!'}
              </p>
            </div>
          ) : (
            diagnoses.map(diagnosis => (
              <Link 
                key={diagnosis.id}
                to={`/result/${diagnosis.id}`}
                className="flex bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={diagnosis.imageUri} 
                    alt="Diagnosis" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3 flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-medium">
                      {diagnosis.result?.detections && diagnosis.result.detections.length > 0
                        ? diagnosis.result.detections[0].label.replace('___', ' ')
                        : language === 'en' ? 'Processing...' : 'प्रोसेसिंग...'}
                    </h3>
                    {diagnosis.result?.detections && diagnosis.result.detections.length > 0 && (
                      <span className="text-sm px-2 py-0.5 bg-cafri-red bg-opacity-10 text-cafri-red rounded">
                        {Math.round(diagnosis.result.detections[0].confidence * 100)}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(diagnosis.timestamp)}
                  </p>
                  <div className="mt-auto">
                    {!diagnosis.isProcessed && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse mr-2"></div>
                        <span className="text-xs text-amber-600">
                          {language === 'en' ? 'Pending' : 'लंबित'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
