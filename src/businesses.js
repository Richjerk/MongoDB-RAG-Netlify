// src/businesses.js

import { connectToDatabase } from './db.js';

export const addBusiness = async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('businesses'); // Specify your collection name

    try {
        const newBusiness = {
            name: req.body.businessName,
            description: req.body.businessDescription,
            email: req.body.businessEmail,
            phone: req.body.businessPhone,
            address: req.body.businessAddress,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newBusiness);
        res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
        console.error('Error adding business:', error);
        res.status(500).json({ success: false, message: 'Error adding business' });
    }
};
