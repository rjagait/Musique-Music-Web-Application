const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
    songid: { type: mongoose.Schema.Types.ObjectId, ref: 'Songs', required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    review: { type: String, maxlength: 100 },
    rating: { type: Number, required: true, max: 5 },
}, { collection: 'Reviews' });

module.exports = mongoose.model('Reviews', reviewsSchema);