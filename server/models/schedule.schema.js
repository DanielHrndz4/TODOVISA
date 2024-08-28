const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('schedules', scheduleSchema); // Exporta el modelo 'Form'
