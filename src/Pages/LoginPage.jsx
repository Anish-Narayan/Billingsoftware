import React, { useState } from 'react';
import '../styles/Login.css';
import { auth, provider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailPasswordLogin = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            // Redirect to Admin Panel after successful login
        } catch (error) {
            alert("Invalid email or password");
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            alert("Google login successful!");
            // Redirect to Admin Panel after successful login
        } catch (error) {
            alert("Google login failed");
            console.error(error);
        }
    };

    return (
        <div className="static-login-page">
            <div className="static-login-container">
                <div className="static-login-branding">
                    <div className="branding-content">
                        <h1>Welcome to the Admin Panel</h1>
                        <p>A professional dashboard for accessing Admin Panel</p>
                    </div>
                </div>

                <div className="static-login-form-container">
                    <form className="static-login-form" onSubmit={handleEmailPasswordLogin}>
                        <h2>Sign In</h2>
                        <p className="form-intro">Access your account using your credentials.</p>
                        
                        <div className="input-group">
                            <span className="input-icon">👤</span>
                            <input 
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div className="input-group">
                            <span className="input-icon">🔒</span>
                            <input 
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <button type="submit" className="submit-btn">
                            Sign In
                        </button>
                        
                        <div className="separator"><span>OR</span></div>
                        
                        <div className="social-logins">
                            <button type="button" className="social-btn google" onClick={handleGoogleSignIn}>
                                <span>G</span> Sign in with Google
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
