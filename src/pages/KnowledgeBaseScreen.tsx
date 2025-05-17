
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';

const KnowledgeBaseScreen: React.FC = () => {
  const { diseaseInfo, language } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const filteredDiseases = searchTerm 
    ? diseaseInfo.filter(disease => 
        disease.disease.toLowerCase().includes(searchTerm.toLowerCase()))
    : diseaseInfo;
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title={{ en: "Knowledge Base", hi: "ज्ञान केंद्र" }}
      />
      
      <div className="p-4">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'en' ? "Search diseases..." : "रोग खोजें..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafri-purple"
          />
        </div>
        
        <div className="space-y-4">
          {filteredDiseases.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {language === 'en' 
                  ? 'No diseases found matching your search' 
                  : 'आपकी खोज से मेल खाने वाला कोई रोग नहीं मिला'}
              </p>
            </div>
          ) : (
            filteredDiseases.map(disease => (
              <div 
                key={disease.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              >
                <div 
                  className="flex p-4 cursor-pointer"
                  onClick={() => toggleExpand(disease.id)}
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={disease.images[0]} 
                      alt={disease.disease} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="font-semibold text-cafri-purple-dark">
                      {disease.disease.replace('___', ' ')}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {disease.symptoms[language]}
                    </p>
                  </div>
                </div>
                
                {expandedId === disease.id && (
                  <div className="px-4 pb-4 pt-0">
                    <hr className="mb-3" />
                    <h4 className="text-sm font-medium mb-2">
                      {language === 'en' ? 'Symptoms' : 'लक्षण'}
                    </h4>
                    <p className="text-sm mb-4">
                      {disease.symptoms[language]}
                    </p>
                    
                    <h4 className="text-sm font-medium mb-2">
                      {language === 'en' ? 'Treatment & Management' : 'उपचार और प्रबंधन'}
                    </h4>
                    <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                      {disease.treatments[language].map((treatment, index) => (
                        <li key={index}>{treatment}</li>
                      ))}
                    </ul>
                    
                    <h4 className="text-sm font-medium mb-2">
                      {language === 'en' ? 'Images' : 'चित्र'}
                    </h4>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {disease.images.map((image, index) => (
                        <div key={index} className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${disease.disease} ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseScreen;
