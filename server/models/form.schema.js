const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    questions: [{
        pregunta: {
            type: String,
            required: true
        },
        tipo_pregunta: {
            type: String,
            enum: ['abierta', 'cerrada'], // Asegúrate de ajustar según tus necesidades
            required: true
        },
        respuestas: [{
            type: String
        }]
    }]
});

module.exports = mongoose.model('Form', formSchema); // Exporta el modelo 'Form'
