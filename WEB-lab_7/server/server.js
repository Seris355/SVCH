const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('✓ Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('✗ Unable to connect to the database:', err);
  });

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'MasterClass API Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

