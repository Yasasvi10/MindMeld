const express = require('express')

const { submitScore } = require('../controllers/gamesController'); 
const router = express.Router()

// Define the POST route for submitting score
router.post('/:gameId/submit-score', submitScore);

module.exports = router