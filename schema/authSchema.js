const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 100,
        required: true,
    },
    email: {
        type: String,
        max: 100,
        required: true,
    },
    password: {
        type: String,
        max: 2000,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);