const mongoose = require('mongoose');

const songsSchema = mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    // , match: /^[a-zA-Z0-9 -,]*$/ 
    artist: { type: String, required: true, maxlength: 30 },
    album: { type: String, maxlength: 30 },
    track: { type: String, maxlength: 30 },
    genre: { type: String, maxlength: 30 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
    totalReviews: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    isHidden: { type: Boolean, required: true, default: false },
}, { collection: 'Songs' });

module.exports = mongoose.model('Songs', songsSchema);