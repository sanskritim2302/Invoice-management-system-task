import mongoose from 'mongoose';
import Invoice from '../models/Invoice.js';

// Create a new invoice
export const createInvoice = async (req, res) => {
    const { clientName, amount, dueDate } = req.body;

    try {
        const invoice = new Invoice({ clientName, amount, dueDate });
        await invoice.save();
        res.status(201).json(invoice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all invoices
export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a single invoice by ID
export const getInvoice = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid invoice ID' });
    }

    try {
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (err) {
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};

// Approve an invoice
export const approveInvoice = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid invoice ID' });
    }

    try {
        const invoice = await Invoice.findByIdAndUpdate(
            id,
            { status: 'Approved' },
            { new: true }
        );
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (err) {
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};
