import React from 'react';
import '../styles/AdminPanel.css';
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaCog, FaSignOutAlt, FaBell, FaUserCircle, FaDollarSign, FaShoppingCart, FaUserPlus } from 'react-icons/fa';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>AdminPanel</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-link active">
            <FaTachometerAlt /> Dashboard
          </a>
          <a href="#" className="nav-link">
            <FaUsers /> Users
          </a>
          <a href="#" className="nav-link">
            <FaBoxOpen /> Products
          </a>
          <a href="#" className="nav-link">
            <FaCog /> Settings
          </a>
        </nav>
        <div className="sidebar-footer">
          <a href="/login" className="nav-link">
            <FaSignOutAlt /> Log Out
          </a>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>Dashboard Overview</h1>
          <div className="header-actions">
            <FaBell className="action-icon" />
            <FaUserCircle className="action-icon" />
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <FaDollarSign className="stat-icon revenue" />
            <div>
              <p className="stat-label">Total Revenue</p>
              <h3 className="stat-value">$48,295</h3>
            </div>
          </div>
          <div className="stat-card">
            <FaShoppingCart className="stat-icon orders" />
            <div>
              <p className="stat-label">Total Orders</p>
              <h3 className="stat-value">1,321</h3>
            </div>
          </div>
          <div className="stat-card">
            <FaUserPlus className="stat-icon new-users" />
            <div>
              <p className="stat-label">New Users This Month</p>
              <h3 className="stat-value">78</h3>
            </div>
          </div>
        </section>

        <section className="content-card">
          <h2>Recent Orders</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#85321</td>
                  <td>John Doe</td>
                  <td>2023-10-27</td>
                  <td><span className="status shipped">Shipped</span></td>
                  <td>$125.50</td>
                </tr>
                <tr>
                  <td>#85320</td>
                  <td>Jane Smith</td>
                  <td>2023-10-27</td>
                  <td><span className="status pending">Pending</span></td>
                  <td>$89.99</td>
                </tr>
                <tr>
                  <td>#85319</td>
                  <td>Michael Chen</td>
                  <td>2023-10-26</td>
                  <td><span className="status delivered">Delivered</span></td>
                  <td>$204.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;