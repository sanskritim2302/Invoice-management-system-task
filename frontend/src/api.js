// frontend/src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust to your backend API URL

// Get all invoices
export const getInvoices = async () => {
  try {
    const response = await axios.get(`${API_URL}/invoices`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

// Create an invoice
export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_URL}/invoices`, invoiceData);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};

// Approve an invoice
export const approveInvoice = async (invoiceId) => {
  try {
    const response = await axios.put(`${API_URL}/invoices/${invoiceId}/approve`);
    return response.data;
  } catch (error) {
    console.error("Error approving invoice:", error);
    throw error;
  }
};

// Mark an invoice as paid
export const payInvoice = async (invoiceId, paymentData) => {
  try {
    const response = await axios.put(`${API_URL}/invoices/${invoiceId}/pay`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error paying invoice:", error);
    throw error;
  }
};
