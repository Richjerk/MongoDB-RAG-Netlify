document.addEventListener('DOMContentLoaded', function () {
    // Geolocation feature
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        }, function (error) {
            console.error('Error getting location', error);
        });
    } else {
        console.log('Geolocation is not supported by this browser.');
    }

    // Chatbot functionality
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotSend = document.getElementById('chatbot-send');

    // Send message to the chatbot
    chatbotSend.addEventListener('click', async () => {
        const message = chatbotInput.value;
        if (message.trim() === '') return;

        // Display the user's message
        const userMessage = document.createElement('p');
        userMessage.textContent = `You: ${message}`;
        chatbotMessages.appendChild(userMessage);

        // Clear input
        chatbotInput.value = '';

        try {
            // Send message to the chatbot API (Replace with your API endpoint)
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            // Display the chatbot's response
            const botMessage = document.createElement('p');
            botMessage.textContent = `Bot: ${data.reply}`; // Assuming your API returns { reply: "..." }
            chatbotMessages.appendChild(botMessage);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Bot: Sorry, I couldn't respond.`;
            chatbotMessages.appendChild(errorMessage);
        }

        // Scroll to the bottom of the messages
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    });

    // Optional: Handle "Enter" key to send message
    chatbotInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            chatbotSend.click();
        }
    });
});

