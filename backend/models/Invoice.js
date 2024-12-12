import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  clientName: String,
  amount: Number,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Paid', 'Rejected', 'Partially Paid'],
    default: 'Pending',
  },
  dueDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  paymentStatus: {
    type: String,
    enum: ['Unpaid', 'Paid', 'Partially Paid'],
    default: 'Unpaid',
  },
  category: String,
  description: String,
  approvalHistory: [
    {
      date: Date,
      approvedBy: String,
      status: String,
    },
  ],
  paymentHistory: [
    {
      amount: Number,
      date: Date,
      paidBy: String,
    },
  ],
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
