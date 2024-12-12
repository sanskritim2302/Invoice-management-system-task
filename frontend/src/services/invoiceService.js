import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/invoices';

export const fetchInvoices = () => axios.get(apiUrl);
export const approveInvoice = (id) => axios.put(`${apiUrl}/${id}/approve`);
export const payInvoice = (id, amountPaid, paidBy) => 
  axios.put(`${apiUrl}/${id}/pay`, { amountPaid, paidBy });
