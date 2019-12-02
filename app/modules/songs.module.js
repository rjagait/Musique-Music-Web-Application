const mongoose = require('mongoose');

const songsSchema = mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    artist: { type: String, required: true, max: 30 },
    album: { type: String, max: 30 },
    track: { type: String, max: 30 },
    genre: { type: String, max: 30 },
    isHidden: { type: Number, required: true, default: 0 },
}, { collection: 'Songs' });

module.exports = mongoose.model('Songs', songsSchema);