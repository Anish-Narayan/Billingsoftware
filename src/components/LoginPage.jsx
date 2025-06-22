    import React, { useState } from 'react'; 
    import '../styles/Login.css';
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import AdminPanel from './AdminPanel';
import App from '../App';

    const LoginPage = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (event) => {
            event.preventDefault();
            if (!email || !password) {
                alert('Please enter both an email and a password.');
                return; 
            }
            else;{
            const auth = getAuth(App);
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("4");
            
            })
            .catch((error) => {
                alert("Invalid login");
            });
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
                        {/* 4. CONNECT HANDLER: Attach the handleSubmit function to the form's onSubmit event */}
                        <form className="static-login-form" onSubmit={handleSubmit}>
                            <h2>Sign In</h2>
                            <p className="form-intro">Access your account using your credentials.</p>
                            
                            <div className="input-group">
                                <span className="input-icon">👤</span>
                                <input 
                                    id="Email_address"
                                    type="email"
                                    placeholder="Email Address"
                                    aria-label="Email Address"
                                    // 5. CONNECT STATE: Link this input to the 'email' state
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <div className="input-group">
                                <span className="input-icon">🔒</span>
                                <input 
                                    id="Password"
                                    type="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                    // 6. CONNECT STATE: Link this input to the 'password' state
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            
                            <div className="form-options">
                                <label className="remember-me">
                                    <input type="checkbox" />
                                    Remember me
                                </label>
                                <a href="#forgot-password">Forgot Password?</a>
                            </div>
                            
                            {/* This button will now trigger the form's onSubmit event */}
                            <button type="submit" className="submit-btn">
                                Sign In
                            </button>
                            
                            <div className="separator"><span>OR</span></div>
                            
                            <div className="social-logins">
                            <button id="signin_google" type="button" className="social-btn google">
                                <span>G</span>
                                Sign in with Google
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