const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: { type: String, required: true, maxlength: 30, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    password: { type: String, required: true },
    isManager: { type: Boolean, required: true, default: 0 },
    isDeactivated: { type: Boolean, required: true, default: 0 },
    isActive: { type: Boolean, required: true, default: 0 },
    isGoogleLoginID: { type: Boolean, required: true, default: 0 },
    secretToken: { type: String, maxlength: 8 },
}, { collection: 'Users' });

module.exports = mongoose.model('Users', usersSchema);