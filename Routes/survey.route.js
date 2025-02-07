const express = require('express');
const {  getSurveyById, createSurvey, updateSurvey, deleteSurvey, getSurveys } = require('../Controller/survey.controller');

const router = express.Router();

// Controller functions (you need to implement these)

// Routes
router.get('/all', getSurveys);
router.get('/single/:id', getSurveyById);
router.post('/create', createSurvey);
router.put('/update/:id', updateSurvey);
router.delete('/delete/:id', deleteSurvey);

module.exports = router;