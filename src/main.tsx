import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import XlsxContextWrapper from './context/xlsxContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <XlsxContextWrapper>
      <App />
    </XlsxContextWrapper>
  </React.StrictMode>
);
