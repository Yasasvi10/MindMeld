const mongoose = require("mongoose");
const RecommendationSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priorityAreas: [
      {
        area: {
          type: String,
          required: true,
          enum: ["Memory", "Attention", "Reaction Time", "Focus"],
        },
        description: {
          type: String,
          required: true,
        },
        currentScore: {
          type: Number,
          required: true,
        },
        targetScore: {
          type: Number,
          required: true,
        },
      },
    ],
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        duration: {
          type: String,
          required: true, // Recommended duration for playing the game
        },
      },
    ],
    lifestyleRecommendations: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
});
  
  module.exports = mongoose.model("Recommendation", RecommendationSchema);
  