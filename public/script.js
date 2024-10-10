// server.js

const express = require('express'); 
const path = require('path');
const chatbotService = require('./chatbotService'); // Import your chatbot service

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json()); // You can use this instead of bodyParser.json() for JSON requests

// Serve static files (e.g., HTML, CSS, JavaScript) from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Chatbot API
app.post('/api/chatbot', async (req, res) => {
    const { message } = req.body; // Destructure the message from the request body
    try {
        const reply = await chatbotService.getReply(message); // Ensure getReply is defined in chatbotService
        res.json({ reply });
    } catch (error) {
        console.error('Error getting reply:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Business listing API
app.post('/api/businesses', async (req, res) => {
    const { businessName, businessDescription, businessEmail, businessPhone, businessAddress } = req.body;

    try {
        // Here you would typically save the business data to your MongoDB database
        // Example: await db.collection('businesses').insertOne({ businessName, businessDescription, businessEmail, businessPhone, businessAddress });

        console.log('Business data received:', {
            businessName,
            businessDescription,
            businessEmail,
            businessPhone,
            businessAddress,
        });

        // Respond with a success message
        res.status(201).json({ message: 'Business listed successfully!' });
    } catch (error) {
        console.error('Error saving business data:', error);
        res.status(500).json({ error: 'Error saving business data' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Get user location for geo-tracking
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        }, function (error) {
            console.error('Error getting location', error);
        });
    }

    const form = document.getElementById('business-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            businessName: formData.get('businessName'),
            businessDescription: formData.get('businessDescription'),
            businessEmail: formData.get('businessEmail'),
            businessPhone: formData.get('businessPhone'),
            businessAddress: formData.get('businessAddress'),
        };

        // Optional: Handle file upload (if required)
        const fileInput = document.getElementById('businessImage');
        const file = fileInput.files[0];
        if (file) {
            // Upload the file to your file storage service (not shown here)
            console.log(`Uploading file: ${file.name}`);
        }

        try {
            const response = await fetch('/api/businesses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert(result.message); // Display the success message from the response
            form.reset(); // Reset the form after successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error listing your business. Please try again.');
        }
    });
});
