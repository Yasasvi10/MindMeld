const express = require("express");
const { getAnalytics, getInsights } = require("../controllers/analyticsController");
const requireAuth = require('../middleware/requireAuth'); 
const router = express.Router();

// router.get("/progress", authenticate, getAnalytics);
const AnalyticsController = require("../controllers/analyticsController");

// Route to get analytics data
router.get("/",requireAuth, AnalyticsController.getAnalytics);
router.get("/insights",requireAuth, AnalyticsController.getInsights);

module.exports = router;
