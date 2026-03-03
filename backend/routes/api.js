const express = require('express');
const router = express.Router();
const Intel = require('../models/Intel');

// Get all intel, with optional filtering via query params
// Example: /api/intel?sourceType=CEO_COMM
router.get('/intel', async (req, res) => {
    try {
        const filter = {};
        if (req.query.sourceType) filter.sourceType = req.query.sourceType;
        if (req.query.ticker) filter.relatedTickers = req.query.ticker.toUpperCase();

        const data = await Intel.find(filter)
            .sort({ publishedAt: -1 }) // Newest first
            .limit(100); // Don't crash the frontend

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch intel' });
    }
});

module.exports = router;