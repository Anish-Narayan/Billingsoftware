import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { FaUsers, FaBoxOpen, FaFileAlt, FaFileInvoiceDollar, FaDollarSign, FaChartBar, FaCog, FaSignOutAlt, FaBell, FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/SettingsPage.css';
import { onAuthStateChanged } from 'firebase/auth';

const SettingsPage = () => {
  const [userData, setUserData] = useState({ displayName: '', email: '' });
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData({
            displayName: user.displayName || userDoc.data().displayName || '',
            email: user.email || userDoc.data().email,
          });
          setNotifications(userDoc.data().notifications || false);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data.');
        setLoading(false);
      }
    } else {
      // Only redirect if we're sure there's no user
      setLoading(false);
      navigate('/login');
    }
  });

  // Cleanup subscription on unmount
  return () => unsubscribe();
}, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const user = auth.currentUser;

    try {
      if (user) {
        await updateProfile(user, { displayName: userData.displayName });
        await updateEmail(user, userData.email);
        await setDoc(doc(db, 'users', user.uid), {
          displayName: userData.displayName,
          email: userData.email,
          notifications,
          updatedAt: new Date(),
        }, { merge: true });
        setSuccess('Profile updated successfully!');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const user = auth.currentUser;

    try {
      if (user && newPassword) {
        await updatePassword(user, newPassword);
        setSuccess('Password updated successfully!');
        setNewPassword('');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  if (loading) return <div className="user-dashboard">Loading...</div>;

  return (
    <div className="user-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>User Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="/users" className="nav-link">
            <FaUsers /> Customers
          </a>
          <a href="#" className="nav-link">
            <FaBoxOpen /> Items
          </a>
          <a href="#" className="nav-link">
            <FaFileAlt /> Estimates
          </a>
          <a href="#" className="nav-link">
            <FaFileInvoiceDollar /> Invoices
          </a>
          <a href="#" className="nav-link">
            <FaDollarSign /> Payments Details
          </a>
          <a href="#" className="nav-link">
            <FaChartBar /> Reports
          </a>
          <a href="/users/settings" className="nav-link active">
            <FaCog /> Settings
          </a>
        </nav>
        <div className="sidebar-footer">
          <a href="#" className="nav-link" onClick={handleSignOut}>
            <FaSignOutAlt /> Log Out
          </a>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>Settings</h1>
          <div className="header-actions">
            <FaBell className="action-icon" />
            <FaUserCircle className="action-icon" />
          </div>
        </header>

        <section className="content-card">
          <h2>Profile Settings</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={userData.displayName}
                onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Notifications</label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span>Enable email notifications</span>
            </div>
            <button type="submit" className="submit-btn">Save Profile</button>
          </form>
        </section>

        <section className="content-card">
          <h2>Change Password</h2>
          <form onSubmit={handleUpdatePassword}>
            <div className="form-group">
              <label>New Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="submit-btn">Update Password</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;