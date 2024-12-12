import express from 'express';
import mongoose from 'mongoose';
import invoiceRoutes from './routes/invoiceRoutes.js'; // Ensure the correct path to your routes

const app = express();
app.use(express.json());
app.use('/api/invoices', invoiceRoutes); // Add your route here

// Example of a basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Invoice API!' });
});

export default app;
