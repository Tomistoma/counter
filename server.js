const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const COUNT_FILE = path.join(__dirname, 'count.txt');

// Function to load the count from the file
function loadCount() {
    if (fs.existsSync(COUNT_FILE)) {
        const data = fs.readFileSync(COUNT_FILE, 'utf-8');
        return parseInt(data, 10) || 0;
    }
    return 0;
}

// Function to save the count to the file
function saveCount(count) {
    fs.writeFileSync(COUNT_FILE, count.toString(), 'utf-8');
}

// Load the initial count from the file
let count = loadCount();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to get the current count
app.get('/data', (req, res) => {
    res.json({ count });
});

// Route to reset the count
app.get('/delete', (req, res) => {
    count = 0;
    saveCount(count); // Save the reset count to the file
    res.json({ message: 'Count has been reset.' });
});

// Default route to thank for incrementing the value
app.get('/', (req, res) => {
    count++; // Increment the count each time the root route is accessed
    saveCount(count); // Save the updated count to the file
    console.log(`Count incremented to: ${count}`);
    res.sendFile(path.join(__dirname, 'thanks.html'));
});

// Use the PORT environment variable or default to 3000 for local development
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Current count: ${count}`);
});
