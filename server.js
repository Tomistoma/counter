// server.js
const express = require('express');
const path = require('path');
const app = express();

let count = 0; // This variable will store the count.

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to get the current count
app.get('/data', (req, res) => {
    res.json({ count });
});

// Route to reset the count
app.get('/delete', (req, res) => {
    count = 0;
    res.json({ message: 'Count has been reset.' });
});

// Default route to thank for incrementing the value
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'thanks.html'));
});

// Use the PORT environment variable or default to 3000 for local development
const PORT = process.env.PORT || 3000;

// Increment count every time the server starts
app.listen(PORT, () => {
    count++;
    console.log(`Server is running on port ${PORT}. Current count: ${count}`);
});
