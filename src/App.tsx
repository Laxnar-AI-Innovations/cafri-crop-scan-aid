
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
