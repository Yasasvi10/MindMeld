const express = require('express')

const { submitScore, createGame  } = require('../controllers/gamesController'); 
const requireAuth = require('../middleware/requireAuth'); 
const router = express.Router()

// Define the POST route for submitting score
router.post('/:gameId/submit-score',requireAuth, submitScore);
router.post('/', createGame);

module.exports = router