import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { registerServiceWorker } from './utils/serviceWorker';

createRoot(document.getElementById('root')!).render(
  <App />
);

// Register service worker for production
registerServiceWorker();