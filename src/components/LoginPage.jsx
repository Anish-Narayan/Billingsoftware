// src/components/StaticLoginPage.js

import React from 'react';
import '../styles/Login.css';
const LoginPage = () => {
    return (
        <div className="static-login-page">
            <div className="static-login-container">
                <div className="static-login-branding">
                    <div className="branding-content">
                        <h1>Welcome to the Admin Panel</h1>
                        <p>A professional dashboard for accessing Admin Panel</p>
                    </div>
                </div>

                {/* Right Side: The Login Form */}
                <div className="static-login-form-container">
                    <form className="static-login-form">
                        <h2>Sign In</h2>
                        <p className="form-intro">Access your account using your credentials.</p>
                        
                        {/* Email Input */}
                        <div className="input-group">
                            {/* <FaUser className="input-icon" /> */}
                            <span className="input-icon">👤</span>
                            <input
                                type="email"
                                placeholder="Email Address"
                                aria-label="Email Address"
                            />
                        </div>
                        
                        {/* Password Input */}
                        <div className="input-group">
                            {/* <FaLock className="input-icon" /> */}
                            <span className="input-icon">🔒</span>
                            <input
                                type="password"
                                placeholder="Password"
                                aria-label="Password"
                            />
                            
                        </div>
                        
                        {/* Form Options */}
                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <a href="#forgot-password">Forgot Password?</a>
                        </div>
                        
                        {/* Submit Button */}
                        <button type="submit" className="submit-btn">
                            Sign In
                        </button>
                        
                        <div className="separator">
                            <span>OR</span>
                        </div>
                        
                        {/* Social Logins */}
                        <div className="social-logins">
                           <button type="button" className="social-btn google">
                               {/* <FaGoogle /> */}
                               <span>G</span>
                               Sign in with Google
                           </button>
                           <button type="button" className="social-btn facebook">
                               {/* <FaFacebook /> */}
                               <span>f</span>
                               Sign in with Facebook
                           </button>
                        </div>
                        
                        <p className="signup-link">
                            Don't have an account? <a href="#signup">Sign Up for free</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;