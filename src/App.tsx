
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Layout from "./components/Layout";
import SplashScreen from "./pages/SplashScreen";
import HomeScreen from "./pages/HomeScreen";
import CameraScreen from "./pages/CameraScreen";
import ResultScreen from "./pages/ResultScreen";
import HistoryScreen from "./pages/HistoryScreen";
import KnowledgeBaseScreen from "./pages/KnowledgeBaseScreen";
import SettingsScreen from "./pages/SettingsScreen";
import NotFound from "./pages/NotFound";
import { Capacitor } from "@capacitor/core";

const queryClient = new QueryClient();

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Add this console log to check if the component is mounting
    console.log("App component mounting");
    
    const initializeApp = async () => {
      try {
        console.log("App initialized");
        console.log("Is native:", Capacitor.isNativePlatform());
        console.log("Platform:", Capacitor.getPlatform());
        
        // Short delay to ensure all initialization is complete
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setIsInitialized(true);
      } catch (error) {
        console.error("Error during initialization:", error);
        setIsInitialized(true); // Still mark as initialized to avoid getting stuck
      }
    };
    
    initializeApp();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/camera" element={<CameraScreen />} />
              <Route path="/result/:id" element={<ResultScreen />} />
              <Route path="/history" element={<HistoryScreen />} />
              <Route path="/knowledge" element={<KnowledgeBaseScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
