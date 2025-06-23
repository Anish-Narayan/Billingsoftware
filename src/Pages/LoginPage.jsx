import React, { useState } from 'react';
import '../styles/Login.css';
import { auth, provider, db } from '../firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);  // Toggle between login/signup

    const handleEmailPassword = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        try {
            if (isNewUser) {
                // Sign Up flow
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Create user document in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    createdAt: new Date()
                });

                alert("Account created successfully!");
                // Redirect to Admin Panel if needed
            } else {
                // Login flow
                await signInWithEmailAndPassword(auth, email, password);
                alert("Login successful!");
                // Redirect to Admin Panel if needed
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

            // Check if Firestore doc exists, if not create one
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    createdAt: new Date()
                });
            }

            alert("Google login successful!");
            // Redirect to Admin Panel if needed
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
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
