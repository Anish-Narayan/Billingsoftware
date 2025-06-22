// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // This imports your main app with all the routes
import './index.css';     // This is for global styles like fonts and resets

// This is the correct setup. It renders your entire <App /> component,
// which handles all the routing and page switching internally.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);