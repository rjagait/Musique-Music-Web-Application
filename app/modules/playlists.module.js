const mongoose = require('mongoose');

const playlistsSchema = mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    playlistArray: { type: Array, "default": [] },
    title: { type: String, required: true, max: 30 },
    isPublic: { type: Number, required: true },
    description: { type: String, max: 100 },
}, { collection: 'Playlists' });

module.exports = mongoose.model('Playlists', playlistsSchema);