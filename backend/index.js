require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint (verify server is running)
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Import routes
const authRoutes = require('./routes/auth');
const ibPartnerRoutes = require('./routes/ibPartner');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/ib-partners', ibPartnerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    success: false, 
    message: 'Server error, please try again' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
