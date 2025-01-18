const express = require("express");
const { getUserProgress } = require("../controllers/analyticsController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/progress", authenticate, getUserProgress);

module.exports = router;
