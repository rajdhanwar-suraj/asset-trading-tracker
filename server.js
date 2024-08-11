const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/dbConfig');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/assets', require('./src/routes/assetRoutes'));
app.use('/marketplace', require('./src/routes/marketplaceRoutes'));

// Error Handling Middleware
app.use(require('./src/middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
