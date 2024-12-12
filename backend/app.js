import express from 'express';
import mongoose from 'mongoose';
import invoiceRoutes from './routes/invoiceRoutes.js'; 

const app = express();
app.use(express.json());
app.use('/api/invoices', invoiceRoutes); 

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Invoice API!' });
});

export default app;
