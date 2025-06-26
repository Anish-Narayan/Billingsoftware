import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase';
import {
  FaUsers,
  FaBoxOpen,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaDollarSign,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
} from 'react-icons/fa';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut().then(() => navigate('/login'));
  };

  if (loading) return <div className="user-panel">Loading...</div>;

  return (
    <div className="user-panel">
      <aside className="sidebar" aria-label="Sidebar navigation">
        <div className="sidebar-header">
          <h2>User Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/users"
            className="nav-link"
            activeClassName="active"
            aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
            end
          >
            <FaUsers aria-hidden="true" /> Customers
          </NavLink>
          <NavLink
            to="/users/items"
            className="nav-link"
            activeClassName="active"
            aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
          >
            <FaBoxOpen aria-hidden="true" /> Items
          </NavLink>
          <NavLink
            to="/users/estimates"
            className="nav-link"
            activeClassName="active"
            aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
          >
            <FaFileAlt aria-hidden="true" /> Estimates
          </NavLink>
          <NavLink
            to="/users/invoices"
            className="nav-link"
            activeClassName="active"
            aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
          >
            <FaFileInvoiceDollar aria-hidden="true" /> Invoices
          </NavLink>
          <NavLink
            to="/users/payments"
            className="nav-link"
            activeClassName="active"
            aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
          >
            <FaDollarSign aria-hidden="true" /> Payments Details
          </NavLink>
          <NavLink
            to="/users/reports"
            className="nav-link"
            activeClassName="active"
            aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
          >
            <FaChartBar aria-hidden="true" /> Reports
          </NavLink>
          <NavLink
            to="/users/settings"
            className="nav-link"
            activeClassName="active"
            aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
          >
            <FaCog aria-hidden="true" /> Settings
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button
            type="button"
            className="nav-link"
            onClick={handleLogout}
            aria-label="Log out"
          >
            <FaSignOutAlt aria-hidden="true" /> Log Out
          </button>
        </div>
      </aside>
      <main className="main-content" aria-label="Main content">
        <Outlet /> {/* Child routes like ReportsPage render here */}
      </main>
    </div>
  );
};

export default UserDashboard;