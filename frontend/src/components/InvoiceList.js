import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/invoiceList.css';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await axios.get('http://localhost:5000/api/invoices');
      setInvoices(res.data);
      setFilteredInvoices(res.data);
    };
    fetchInvoices();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const lowercasedSearchTerm = e.target.value.toLowerCase();
    const filteredData = invoices.filter(
      (invoice) =>
        invoice.clientName.toLowerCase().includes(lowercasedSearchTerm) ||
        invoice.amount.toString().includes(lowercasedSearchTerm)
    );
    setFilteredInvoices(filteredData);
  };

  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
    const filteredData = invoices.filter(
      (invoice) => invoice.status.toLowerCase() === e.target.value.toLowerCase()
    );
    setFilteredInvoices(filteredData);
  };

  const openModal = (invoice, action) => {
    setSelectedInvoice(invoice);
    setActionType(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
    setActionType('');
  };

  const handleApprove = () => {
    // Update invoice status to approved
    if (selectedInvoice) {
      const updatedInvoices = invoices.map((invoice) =>
        invoice._id === selectedInvoice._id
          ? { ...invoice, status: 'approved' }
          : invoice
      );
      setInvoices(updatedInvoices);
      setFilteredInvoices(updatedInvoices);
      closeModal();
    }
  };

  const handlePay = () => {
    // Update invoice status to paid
    if (selectedInvoice) {
      const updatedInvoices = invoices.map((invoice) =>
        invoice._id === selectedInvoice._id
          ? { ...invoice, status: 'paid' }
          : invoice
      );
      setInvoices(updatedInvoices);
      setFilteredInvoices(updatedInvoices);
      closeModal();
    }
  };

  return (
    <div className="invoice-dashboard">
      <h2>Invoice Dashboard</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by client name or amount"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={handleStatusFilter} value={filterStatus}>
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.clientName}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.status}</td>
              <td>
                <button className="approve" onClick={() => openModal(invoice, 'approve')}>Approve</button>
                <button className="pay" onClick={() => openModal(invoice, 'pay')}>Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to {actionType} this invoice?</h3>
            <p>Client: {selectedInvoice.clientName}</p>
            <p>Amount: {selectedInvoice.amount}</p>
            <div className="modal-actions">
              <button onClick={actionType === 'approve' ? handleApprove : handlePay}>Yes</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
