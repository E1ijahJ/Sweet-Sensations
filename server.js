require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const connection = require('./db'); // MySQL connection

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());              // Allow cross-origin requests
app.use(express.json());      // Parse JSON bodies

// Route 1: Get all menu items
app.get('/api/menu', (req, res) => {
    connection.query('SELECT * FROM Menu', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

//  Route 2: Get all reviews
app.get('/api/reviews', (req, res) => {
    connection.query('SELECT * FROM Reviews', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Optional Route 3: Get contact messages
app.get('/api/contact', (req, res) => {
    connection.query('SELECT * FROM Contact', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});