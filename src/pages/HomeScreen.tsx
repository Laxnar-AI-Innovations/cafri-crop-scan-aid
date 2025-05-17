
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calendar, Search, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';

const HomeScreen: React.FC = () => {
  const { language, pendingImages, diagnoses } = useAppContext();
  
  const titles = {
    en: {
      welcome: "Welcome to Crop Doctor",
      diagnose: "Diagnose Now",
      knowledge: "Knowledge Base",
      history: "View History",
      pendingLabel: "Pending Diagnoses",
      recentLabel: "Recent Diagnoses"
    },
    hi: {
      welcome: "क्रॉप डॉक्टर में आपका स्वागत है",
      diagnose: "अभी निदान करें",
      knowledge: "ज्ञान केंद्र",
      history: "इतिहास देखें",
      pendingLabel: "लंबित निदान",
      recentLabel: "हाल के निदान"
    }
  };

  const recentDiagnoses = diagnoses.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={{ 
        en: "CAFRI Crop Doctor", 
        hi: "CAFRI क्रॉप डॉक्टर" 
      }} />
      
      <div className="px-4 py-3">
        <h1 className="text-xl font-bold text-cafri-purple mb-6">
          {titles[language].welcome}
        </h1>
        
        <div className="grid gap-4 mb-8">
          <Link 
            to="/camera" 
            className="bg-cafri-green rounded-lg p-4 flex justify-between items-center shadow-sm"
          >
            <div className="flex items-center">
              <div className="bg-cafri-purple rounded-full p-2 mr-3">
                <Camera size={24} className="text-white" />
              </div>
              <span className="font-semibold text-cafri-purple-dark">
                {titles[language].diagnose}
              </span>
            </div>
            <ArrowRight size={20} className="text-cafri-purple" />
          </Link>
          
          <Link 
            to="/knowledge" 
            className="bg-gray-100 rounded-lg p-4 flex justify-between items-center shadow-sm"
          >
            <div className="flex items-center">
              <div className="bg-cafri-purple-light rounded-full p-2 mr-3">
                <Search size={24} className="text-cafri-purple-dark" />
              </div>
              <span className="font-semibold text-cafri-purple-dark">
                {titles[language].knowledge}
              </span>
            </div>
            <ArrowRight size={20} className="text-cafri-purple" />
          </Link>
          
          <Link 
            to="/history" 
            className="bg-gray-100 rounded-lg p-4 flex justify-between items-center shadow-sm"
          >
            <div className="flex items-center">
              <div className="bg-cafri-purple-light rounded-full p-2 mr-3">
                <Calendar size={24} className="text-cafri-purple-dark" />
              </div>
              <span className="font-semibold text-cafri-purple-dark">
                {titles[language].history}
              </span>
            </div>
            <ArrowRight size={20} className="text-cafri-purple" />
          </Link>
        </div>
        
        {pendingImages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-cafri-purple-dark">
              {titles[language].pendingLabel} ({pendingImages.length})
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center">
              <div className="w-2 h-2 bg-cafri-orange rounded-full animate-pulse mr-2"></div>
              <p className="text-sm text-amber-800">
                {pendingImages.length} image{pendingImages.length > 1 ? 's' : ''} waiting for analysis
              </p>
            </div>
          </div>
        )}
        
        {recentDiagnoses.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-cafri-purple-dark">
                {titles[language].recentLabel}
              </h2>
              <Link to="/history" className="text-sm text-cafri-purple">
                View all
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {recentDiagnoses.map((diagnosis) => (
                <Link 
                  key={diagnosis.id} 
                  to={`/result/${diagnosis.id}`}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <img 
                    src={diagnosis.imageUri} 
                    alt="Diagnosis" 
                    className="w-full h-full object-cover"
                  />
                  {!diagnosis.isProcessed && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
