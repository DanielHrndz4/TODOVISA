const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        response: [{
            type: String
        }],
    }]
});

module.exports = mongoose.model('Form_response', formResponseSchema); 
