// src/db.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'; // Load the dotenv package

dotenv.config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI; // Get the MongoDB URI from environment variables
if (!uri) {
    throw new Error('MONGODB_URI is not defined'); // Throw an error if the URI is not set
}

// Create a new MongoClient instance
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to connect to the database
export const connectToDatabase = async () => {
    try {
        await client.connect(); // Connect to MongoDB
        console.log('Connected to MongoDB');
        return client.db('township_directory'); // Replace with your desired database name
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Database connection failed'); // Propagate the error
    }
};

// Close the MongoDB connection when the application terminates
process.on('SIGINT', async () => {
    await client.close(); // Close the client connection
    console.log('MongoDB connection closed');
    process.exit(0); // Exit the process
});


