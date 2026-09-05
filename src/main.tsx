import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { Provider } from './provider.tsx';

import '@/app/i18n';
import { applyHydratedUiPreferences } from '@/core/preferences/runtime/apply';
import '@/styles/globals.css';

async function bootstrap() {
  await applyHydratedUiPreferences();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

void bootstrap();
