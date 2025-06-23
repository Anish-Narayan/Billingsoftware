import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { FaUsers, FaBoxOpen, FaFileAlt, FaFileInvoiceDollar, FaDollarSign, FaChartBar, FaCog, FaSignOutAlt, FaBell, FaUserCircle } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/ReportsPage.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleSignOut = () => {
    auth.signOut().then(() => navigate('/login'));
  };

  // Sample data for charts (extracted from table for simplicity)
  const chartData = {
    labels: ['June 2025', 'May 2025', 'April 2025'],
    sales: [5200, 12450, 8900],
    invoices: [45, 120, 89],
  };

  // Line chart configuration for sales trends
  const lineChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Total Sales ($)',
        data: chartData.sales,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Trend Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales ($)',
        },
      },
    },
  };

  // Bar chart configuration for invoice counts
  const barChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Number of Invoices',
        data: chartData.invoices,
        backgroundColor: '#10b981',
        borderColor: '#065f46',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Invoices per Report',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Invoices',
        },
      },
    },
  };

  if (loading) return <div className="user-panel">Loading...</div>;

  return (
    <div className="user-panel">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>User Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/users" className="nav-link">
            <FaUsers /> Customers
          </Link>
          <Link to="#" className="nav-link">
            <FaBoxOpen /> Items
          </Link>
          <Link to="#" className="nav-link">
            <FaFileAlt /> Estimates
          </Link>
          <Link to="#" className="nav-link">
            <FaFileInvoiceDollar /> Invoices
          </Link>
          <Link to="#" className="nav-link">
            <FaDollarSign /> Payments Details
          </Link>
          <Link to="/users/reports" className="nav-link active">
            <FaChartBar /> Reports
          </Link>
          <Link to="/users/settings" className="nav-link">
            <FaCog /> Settings
          </Link>
        </nav>
        <div className="sidebar-footer">
          <Link to="/login" className="nav-link" onClick={handleSignOut}>
            <FaSignOutAlt /> Log Out
          </Link>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>Reports</h1>
          <div className="header-actions">
            <FaBell className="action-icon" />
            <FaUserCircle className="action-icon" />
          </div>
        </header>
        <section className="content-card">
          <h2>Sales Overview</h2>
          <div className="charts-container">
            <div className="chart">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
            <div className="chart">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </section>
        <section className="content-card">
          <h2>Sales Reports</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Date Range</th>
                  <th>Total Sales</th>
                  <th>Invoices</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#R1001</td>
                  <td>2025-06-01 to 2025-06-07</td>
                  <td>$5,200.00</td>
                  <td>45</td>
                  <td><span className="status generated">Generated</span></td>
                </tr>
                <tr>
                  <td>#R1002</td>
                  <td>2025-05-01 to 2025-05-31</td>
                  <td>$12,450.00</td>
                  <td>120</td>
                  <td><span className="status generated">Generated</span></td>
                </tr>
                <tr>
                  <td>#R1003</td>
                  <td>2025-04-01 to 2025-04-30</td>
                  <td>$8,900.00</td>
                  <td>89</td>
                  <td><span className="status archived">Archived</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReportsPage;