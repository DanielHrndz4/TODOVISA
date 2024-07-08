const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        type_question: {
            type: String,
            enum: ['abierta', 'cerrada', 'textarea', 'number'], // Asegúrate de ajustar según tus necesidades
            required: true
        },
        response: [{
            type: String
        }],
        user_response:{
            type: String,
        },
        category:{
            type: String,
        }
    }]
});

module.exports = mongoose.model('Form', formSchema); // Exporta el modelo 'Form'
