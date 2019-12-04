const mongoose = require('mongoose');

const songsSchema = mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    // , match: /^[a-zA-Z0-9 -,]*$/ 
    artist: { type: String, required: true, maxlength: 30 },
    album: { type: String, maxlength: 30 },
    track: { type: String, maxlength: 30 },
    genre: { type: String, maxlength: 30 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
    avgRating: { type: Number, required: true, default: 0 },
    isHidden: { type: Number, required: true, default: 0 },
}, { collection: 'Songs' });

module.exports = mongoose.model('Songs', songsSchema);