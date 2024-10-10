// server.js
const express = require('express');
const bodyParser = require('body-parser');
const chatbotService = require('./chatbotService'); // Import your chatbot service

const app = express();
app.use(bodyParser.json());

app.post('/api/chatbot', async (req, res) => {
    const { message } = req.body;

    // Call your chatbot service to get a response
    const reply = await chatbotService.getReply(message);
    res.json({ reply });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
