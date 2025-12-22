import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n'; // Добавляем импорт i18n
import './normalise_css.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);