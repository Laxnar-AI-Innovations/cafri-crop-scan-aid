
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Log when the main script runs
console.log('Main script running');

const renderApp = () => {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    console.log('Root element found, mounting React app');
    createRoot(rootElement).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  } else {
    console.error('Root element not found!');
  }
};

// Ensure DOM is loaded before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
  console.log('Waiting for DOMContentLoaded event');
} else {
  console.log('DOM already loaded, rendering immediately');
  renderApp();
}
