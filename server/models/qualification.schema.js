const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tel: { type: String, required: true },
    user_country: { type: String, required: true },
    form_country: { type: String },
    response: [
        {
            dh: {
                correct: { type: Number },
                incorrect: { type: Number }
            },
            aff: {
                correct: { type: Number },
                incorrect: { type: Number }
            },
            hv: {
                correct: { type: Number },
                incorrect: { type: Number }
            },
            hd: {
                correct: { type: Number },
                incorrect: { type: Number }
            }
        }
    ],
    qualification: { type: String, required: true }
});

const ResultData = mongoose.model('ResultData', qualificationSchema);

module.exports = ResultData;
