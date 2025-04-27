// server.js

// Use ES Modules syntax
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { addBusiness } from './src/businesses.js';
import { getReply } from './src/chatbotService.js'; // Correctly import getReply from src/chatbotService.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JavaScript) from the public directory
app.use(express.static(path.join(process.cwd(), 'public'))); // Serve static files from the public directory

// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Chatbot API
app.post('/api/chatbot', async (req, res) => {
    const { message } = req.body; // Destructure the message from the request body
    try {
        const reply = await getReply(message); // Call the getReply function from chatbotService
        res.json({ reply });
    } catch (error) {
        console.error('Error getting reply:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Business API
app.post('/api/businesses', addBusiness);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
