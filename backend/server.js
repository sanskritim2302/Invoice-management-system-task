import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import invoiceRoutes from './routes/invoiceRoutes.js';

dotenv.config();

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors()); // This will allow all origins by default, or specify options as needed

app.use(express.json());
app.use('/api', invoiceRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
