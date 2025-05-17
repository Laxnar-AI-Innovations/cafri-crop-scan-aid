
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface HeaderProps {
  title: {
    en: string;
    hi: string;
  };
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = false }) => {
  const navigate = useNavigate();
  const { language } = useAppContext();

  return (
    <header className="bg-white py-4 px-4 border-b border-gray-200 flex items-center">
      {showBack && (
        <button 
          onClick={() => navigate(-1)} 
          className="mr-3 p-1"
          aria-label="Go back"
        >
          <ArrowLeft size={24} className="text-cafri-purple-dark" />
        </button>
      )}
      <h1 className="text-xl font-semibold text-cafri-purple-dark flex-1">
        {title[language]}
      </h1>
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/c8d32a6a-bea7-4a5f-bf2b-eb996a5d4cb8.png" 
          alt="LAXNAR AI INNOVATIONS" 
          className="h-5"
        />
      </div>
    </header>
  );
};

export default Header;
