const mongoose = require('mongoose');

const playlistsSchema = mongoose.Schema({
    username: { type: String, required: true, maxlength: 100 },
    playlistArray: { type: Array, "default": [] },
    title: { type: String, required: true, maxlength: 30 },
    isPublic: { type: Number, required: true },
    description: { type: String, maxlength: 100 },
}, { collection: 'Playlists' });

module.exports = mongoose.model('Playlists', playlistsSchema);