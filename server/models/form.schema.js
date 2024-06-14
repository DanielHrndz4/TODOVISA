const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: mongoose.Schema.Types.Mixed, required: true }
});

const formSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema], 
        required: true
    }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
