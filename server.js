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
    count++; // Increment the count each time the root route is accessed
    console.log(`Count incremented to: ${count}`);
    res.sendFile(path.join(__dirname, 'thanks.html'));
});

// Use the PORT environment variable or default to 3000 for local development
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Current count: ${count}`);
});
