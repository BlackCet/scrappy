const mongoose = require('mongoose');

const IntelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    url: { type: String, required: true, unique: true }, // Stops duplicate scraping
    
    // Categorizing the 5 tasks
    sourceType: { 
        type: String, 
        enum: ['CEO_COMM', 'STOCK_SIGNAL', 'TECH_NEWS', 'BIG_TECH_RD', 'HACKATHON'],
        required: true 
    },
    
    sourceName: String, // e.g., "Sam Altman (X)", "TechCrunch", "HN"
    relatedTickers: [String], // e.g., ["MSFT", "NVDA"]
    sentiment: { type: String, enum: ['BULLISH', 'BEARISH', 'NEUTRAL'] },
    
    publishedAt: { type: Date, default: Date.now }
});

// Indexing for fast frontend filtering
IntelSchema.index({ sourceType: 1, publishedAt: -1 });

module.exports = mongoose.model('Intel', IntelSchema);