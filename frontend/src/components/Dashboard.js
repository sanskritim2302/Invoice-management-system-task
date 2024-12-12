import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvoiceList from './InvoiceList';
import Form from './InvoiceForm';
import '../styles/dashboard.css'; // Import dashboard-specific styles

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(res.data);
      } catch (err) {
        setError('Failed to fetch invoices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="dashboard">
   
      <div className="content-container">
        <Form setInvoices={setInvoices} />
        {loading && <div className="loading">Loading invoices...</div>}
        {error && <div className="error">{error}</div>}
        {!loading && !error && <InvoiceList invoices={invoices} setInvoices={setInvoices} />}
      </div>
    </div>
  );
};

export default Dashboard;
