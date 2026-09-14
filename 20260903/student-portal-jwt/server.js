require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// Routes Setup
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});