import React, { useState } from 'react';
import { createInvoice } from '../api';
import '../styles/global.css';  // Import global styles
import '../styles/invoiceForm.css';
const InvoiceForm = () => {
    const [clientName, setClientName] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const invoiceData = { clientName, amount, dueDate };
        const newInvoice = await createInvoice(invoiceData);
        console.log('Invoice Created:', newInvoice);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Client Name:
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </label>
            <label>
                Amount:
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </label>
            <label>
                Due Date:
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </label>
            <button type="submit">Create Invoice</button>
        </form>
    );
};

export default InvoiceForm;
