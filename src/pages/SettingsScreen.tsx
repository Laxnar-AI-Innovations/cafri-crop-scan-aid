
import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/Header';

const SettingsScreen: React.FC = () => {
  const { language, setLanguage } = useAppContext();

  const handleLanguageChange = (newLanguage: 'en' | 'hi') => {
    setLanguage(newLanguage);
  };

  const clearStorage = () => {
    // Just a mock function, we don't actually clear storage in this demo
    alert(language === 'en' 
      ? 'Local storage cleared. All pending images and settings have been reset.' 
      : 'स्थानीय स्टोरेज साफ़ की गई। सभी लंबित छवियां और सेटिंग्स रीसेट कर दी गई हैं।');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title={{ en: "Settings", hi: "सेटिंग्स" }}
      />
      
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">
              {language === 'en' ? 'Language' : 'भाषा'}
            </h2>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`flex items-center justify-between p-2 rounded-md ${
                  language === 'en' ? 'bg-cafri-purple bg-opacity-10' : ''
                }`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-2">🇬🇧</span>
                  <span>English</span>
                </div>
                {language === 'en' && (
                  <div className="w-4 h-4 rounded-full bg-cafri-purple"></div>
                )}
              </button>
              <button
                onClick={() => handleLanguageChange('hi')}
                className={`flex items-center justify-between p-2 rounded-md ${
                  language === 'hi' ? 'bg-cafri-purple bg-opacity-10' : ''
                }`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-2">🇮🇳</span>
                  <span>हिन्दी</span>
                </div>
                {language === 'hi' && (
                  <div className="w-4 h-4 rounded-full bg-cafri-purple"></div>
                )}
              </button>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">
              {language === 'en' ? 'App Settings' : 'ऐप सेटिंग्स'}
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {language === 'en' ? 'Use GPS Location' : 'GPS स्थान का उपयोग करें'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'en' 
                      ? 'Record location with each diagnosis' 
                      : 'प्रत्येक निदान के साथ स्थान रिकॉर्ड करें'}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {language === 'en' ? 'Offline Mode' : 'ऑफलाइन मोड'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'en' 
                      ? 'Store images for later analysis' 
                      : 'बाद के विश्लेषण के लिए छवियां स्टोर करें'}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {language === 'en' ? 'High Resolution Images' : 'उच्च रिज़ॉल्यूशन छवियां'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'en' 
                      ? 'Uses more data but better accuracy' 
                      : 'अधिक डेटा का उपयोग करता है लेकिन बेहतर सटीकता'}
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">
              {language === 'en' ? 'Data Management' : 'डेटा प्रबंधन'}
            </h2>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                {language === 'en' ? 'Export All Diagnoses' : 'सभी निदान निर्यात करें'}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={clearStorage}
              >
                {language === 'en' ? 'Clear Local Storage' : 'स्थानीय स्टोरेज साफ़ करें'}
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">
              {language === 'en' ? 'About' : 'ऐप के बारे में'}
            </h2>
            <div className="space-y-2 text-sm">
              <p><strong>{language === 'en' ? 'App Name:' : 'ऐप का नाम:'}</strong> CAFRI Crop Doctor</p>
              <p><strong>{language === 'en' ? 'Version:' : 'संस्करण:'}</strong> 1.0.0</p>
              <p><strong>{language === 'en' ? 'Developed by:' : 'द्वारा विकसित:'}</strong> CAFRI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
