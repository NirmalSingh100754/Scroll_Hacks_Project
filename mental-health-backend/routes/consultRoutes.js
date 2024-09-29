// routes/consultRoutes.js
const express = require('express');
const { createConsultation, getConsultations } = require('../controllers/consultController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/consult', authMiddleware, createConsultation);
router.get('/consultations', authMiddleware, getConsultations);

module.exports = router;
