// models/consultation.js
const mongoose = require('mongoose');
const ConsultationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    suggestion: { type: String, required: true },
});
module.exports = mongoose.model('Consultation', ConsultationSchema);
