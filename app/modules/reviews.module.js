const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
    songid: { type: String, required: true, max: 30 },
    review: { type: String, max: 100 },
    rating: { type: Number, required: true },
}, { collection: 'Reviews' });

module.exports = mongoose.model('Reviews', reviewsSchema);