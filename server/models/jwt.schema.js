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
    country:{
        type: String,
        required: true
    },
    jwt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('jwt', jwtSchema); // Exporta el modelo 'Form'