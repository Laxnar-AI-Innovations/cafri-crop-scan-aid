
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { Diagnosis, DiseaseInfo } from '@/types';
import { mockDiagnoses, mockDiseaseInfo } from '@/data/mockData';

type Language = 'en' | 'hi';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isOnline: boolean;
  diagnoses: Diagnosis[];
  addDiagnosis: (diagnosis: Diagnosis) => void;
  pendingImages: string[];
  addPendingImage: (imageUri: string) => void;
  removePendingImage: (imageUri: string) => void;
  diseaseInfo: DiseaseInfo[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(mockDiagnoses);
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const [diseaseInfo, setDiseaseInfo] = useState<DiseaseInfo[]>(mockDiseaseInfo);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You are back online!");
      
      // Simulate processing pending images when back online
      if (pendingImages.length > 0) {
        toast.info(`Processing ${pendingImages.length} pending image(s)...`);
        setTimeout(() => {
          setPendingImages([]);
          toast.success("All pending images processed!");
        }, 3000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You are offline. Images will be queued and processed when you're back online.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingImages.length]);

  const addDiagnosis = (diagnosis: Diagnosis) => {
    setDiagnoses(prev => [diagnosis, ...prev]);
  };

  const addPendingImage = (imageUri: string) => {
    setPendingImages(prev => [...prev, imageUri]);
  };

  const removePendingImage = (imageUri: string) => {
    setPendingImages(prev => prev.filter(uri => uri !== imageUri));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isOnline,
        diagnoses,
        addDiagnosis,
        pendingImages,
        addPendingImage,
        removePendingImage,
        diseaseInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
