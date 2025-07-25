const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for CleverTap events (optional)
app.use(express.json());

app.post('/api/clevertap-event', (req, res) => {
    console.log('CleverTap event received:', req.body);
    res.json({ success: true, message: 'Event logged' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Make sure to access via http://localhost:3000 for testing');
});

module.exports = app;