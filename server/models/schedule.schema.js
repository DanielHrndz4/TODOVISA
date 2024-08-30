const mongoose = require('mongoose');

function createExpiryDate(date, schedule) {
    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes] = schedule.split(' - ')[1].split(':').map(Number);

    const localDate = new Date(year, month - 1, day, hours, minutes, 0);

    localDate.setDate(localDate.getDate() + 1);

    const utcOffset = localDate.getTimezoneOffset(); // Obtiene el offset en minutos
    const utcDate = new Date(localDate.getTime() - utcOffset * 60000); // Ajusta el tiempo a UTC

    return utcDate;
}

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
    expiresAt: {
        type: Date,
    }
});

// Middleware para establecer `expiresAt` antes de guardar
scheduleSchema.pre('save', function(next) {
    if (this.isNew) {
        this.expiresAt = createExpiryDate(this.date, this.schedule);
    }
    next();
});

module.exports = mongoose.model('schedules', scheduleSchema); // Exporta el modelo 'schedules'
