const express = require("express");
const { getRecommendations } = require("../controllers/recController");
const requireAuth = require('../middleware/requireAuth'); 

const router = express.Router();

router.get("/recommendations", requireAuth, getRecommendations);

module.exports = router;
