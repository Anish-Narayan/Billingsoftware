import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { auth, provider, db } from '../firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);  
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailPassword = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        try {
            if (isNewUser) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    createdAt: new Date()
                });
                alert("Account created successfully!");
                navigate('/admin');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Login Successful");
                // Access control authentication 
                if (email === "admin@sk.in") {
                    navigate('/admin');
                } else {
                    navigate('/users');
                }
            }
        } catch (error) {
            alert(error.message);   
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    createdAt: new Date()
                });
            }
            alert("Google login successful!");
            navigate('/admin');
        } catch (error) {
            alert("Google login failed: " + error.message);
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
                    <form className="static-login-form" onSubmit={handleEmailPassword}>
                        <h2>{isNewUser ? "Sign Up" : "Sign In"}</h2>
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
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        
                        <button type="submit" className="submit-btn">
                            {isNewUser ? "Sign Up" : "Sign In"}
                        </button>
                        
                        <div className="separator"><span>OR</span></div>
                        
                        <div className="social-logins">
                            <button type="button" className="social-btn google" onClick={handleGoogleSignIn}>
                                <span>G</span> Sign in with Google
                            </button>
                        </div>
                        
                        <p className="signup-link">
                            {isNewUser ? "Already have an account?" : "Don't have an account?"}
                            <button 
                                type="button" 
                                onClick={() => setIsNewUser(!isNewUser)} 
                                style={{ marginLeft: "8px", background: "none", border: "none", color: "blue", cursor: "pointer" }}
                            >
                                {isNewUser ? "Sign In" : "Sign Up"}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;