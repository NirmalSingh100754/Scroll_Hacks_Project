// controllers/consultController.js
const Consultation = require('../models/consultation');

// Create consultation
exports.createConsultation = async (req, res) => {
    const { message } = req.body;
    const userId = req.user.id;
    try {
        const suggestion = `Your suggestion for "${message}"`;  // Simulated suggestion generation
        const consultation = new Consultation({ userId, message, suggestion });
        await consultation.save();
        res.status(201).json({ suggestion });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Fetch consultations by user
exports.getConsultations = async (req, res) => {
    const userId = req.user.id;
    try {
        const consultations = await Consultation.find({ userId });
        res.json(consultations);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
