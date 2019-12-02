const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: { type: String, required: true, max: 30 },
    password: { type: String, required: true, max: 30 },
    isManager: { type: Number, required: true, default: 0 },
    isActive: { type: Number, required: true, default: 1 },
}, { collection: 'Users' });

module.exports = mongoose.model('Users', usersSchema);