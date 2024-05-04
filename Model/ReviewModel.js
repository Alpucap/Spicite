const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now }, // Change type to Date for timestamp
    username: String,
    foodName: String,
    rating: Number,
    reviewText: String
});

// Membuat model untuk data review berdasarkan schema
const Review = mongoose.model('Review', ReviewSchema, 'dataReview');
module.exports = Review;