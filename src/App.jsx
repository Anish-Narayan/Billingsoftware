import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // This file will style the landing page

// Import your Loginpage component.
// The path must match your file structure.
import Loginpage from './Pages/LoginPage.jsx';
import AdminPanel from './components/AdminPanel.jsx';

// A simple, static component for the landing page.
function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="landing-content-box">
        <h1 className="landing-title">Pro Invoicer</h1>
        <p className="landing-subtitle">
          The complete solution for managing your professional billing.
        </p>
        <div className="landing-action">
          <Link to="/login" className="btn btn-primary">
            Launch Application
          </Link>
        </div>
      </div>
    </div>
  );
}

// The main App component that defines the routes for your application.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* When the user is at the root URL "/", show the LandingPage */}
        <Route path="/" element={<LandingPage />} />

        {/* When the user navigates to "/login", show your Loginpage component */}
        <Route path="/login" element={<Loginpage />} />
        <Route path="/admin" element={<AdminPanel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;