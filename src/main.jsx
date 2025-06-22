// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // This imports your main app with all the routes
import './index.css';     // This is for global styles like fonts and
import { GoogleOAuthProvider } from '@react-oauth/google';


const CLIENT_ID = '405922937728-5td9ocbo3chgt4julli3otjs30h37ljv.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);