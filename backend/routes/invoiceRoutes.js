import express from 'express';
import Invoice from '../models/Invoice.js';

const router = express.Router();

// Get all invoices
router.get('/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create an invoice
router.post('/invoices', async (req, res) => {
  try {
    const { clientName, amount, dueDate, category, description } = req.body;
    const newInvoice = new Invoice({ clientName, amount, dueDate, category, description });
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Approve an invoice
router.put('/invoices/:id/approve', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).send('Invoice not found');
    }

    invoice.status = 'Approved';
    invoice.approvalHistory.push({ date: new Date(), approvedBy: 'Admin', status: 'Approved' });

    await invoice.save();
    res.json(invoice);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Mark an invoice as paid
router.put('/invoices/:id/pay', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).send('Invoice not found');
    }

    const { amountPaid, paidBy } = req.body;
    invoice.paidAmount += amountPaid;
    if (invoice.paidAmount >= invoice.amount) {
      invoice.paymentStatus = 'Paid';
    } else {
      invoice.paymentStatus = 'Partially Paid';
    }

    invoice.paymentHistory.push({ amount: amountPaid, date: new Date(), paidBy });

    await invoice.save();
    res.json(invoice);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get invoice by ID (for details and history)
router.get('/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).send('Invoice not found');
    }
    res.json(invoice);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
