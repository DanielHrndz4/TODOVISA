const mongoose = require('mongoose');

const jwtSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    jwt: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30 // Expire después de 3000 segundos (50 minutos)
    }
});

module.exports = mongoose.model('jwt', jwtSchema);
