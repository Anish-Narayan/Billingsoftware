import React from 'react';
import '../styles/UserDashboard.css';
import { FaUsers, FaBoxOpen, FaFileAlt, FaFileInvoiceDollar, FaDollarSign, FaChartBar, FaCog, FaSignOutAlt, FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>User Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-link active">
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
          <Link to="/users/reports" className="nav-link">
            <FaChartBar /> Reports
          </Link>
          <Link to="/users/settings" className="nav-link">
            <FaCog /> Settings
          </Link>
        </nav>
        <div className="sidebar-footer">
          <a href="/login" className="nav-link">
            <FaSignOutAlt /> Log Out
          </a>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>Customers Overview</h1>
          <div className="header-actions">
            <FaBell className="action-icon" />
            <FaUserCircle className="action-icon" />
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <FaUsers className="stat-icon customers" />
            <div>
              <p className="stat-label">Total Customers</p>
              <h3 className="stat-value">245</h3>
            </div>
          </div>
          <div className="stat-card">
            <FaFileInvoiceDollar className="stat-icon invoices" />
            <div>
              <p className="stat-label">Open Invoices</p>
              <h3 className="stat-value">32</h3>
            </div>
          </div>
          <div className="stat-card">
            <FaDollarSign className="stat-icon payments" />
            <div>
              <p className="stat-label">Payments Received</p>
              <h3 className="stat-value">$12,450</h3>
            </div>
          </div>
        </section>

        <section className="content-card">
          <h2>Recent Customers</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Total Spent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#C1001</td>
                  <td>Alice Brown</td>
                  <td>alice@example.com</td>
                  <td><span className="status active">Active</span></td>
                  <td>$1,200.00</td>
                </tr>
                <tr>
                  <td>#C1002</td>
                  <td>Bob Wilson</td>
                  <td>bob@example.com</td>
                  <td><span className="status inactive">Inactive</span></td>
                  <td>$450.50</td>
                </tr>
                <tr>
                  <td>#C1003</td>
                  <td>Clara Davis</td>
                  <td>clara@example.com</td>
                  <td><span className="status active">Active</span></td>
                  <td>$3,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;