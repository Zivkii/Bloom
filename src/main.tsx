import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/hanken-grotesk';
import 'maplibre-gl/dist/maplibre-gl.css';
import './index.css';
import App from './App';
import { CollectionProvider } from './store/collection';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CollectionProvider>
        <App />
      </CollectionProvider>
    </BrowserRouter>
  </StrictMode>,
);
