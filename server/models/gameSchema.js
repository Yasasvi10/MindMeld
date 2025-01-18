const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Memory', 'Attention', 'Reaction time', 'Problem Solving'],
  },
  averageScore: {
    type: Number,
    default: 0, // Will be updated dynamically
  },
  topPercentThreshold: {
    type: Number,
    default: 90, // Dynamic threshold for top-performing players
  },
  scores: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  feedbackMessages: [
    {
      minScore: {
        type: Number,
        required: true,
      },
      maxScore: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
});

// Middleware method to update stats dynamically
GameSchema.methods.updateStats = async function () {
  const allScores = this.scores.map((entry) => entry.score);

  // Recalculate average score
  const totalScores = allScores.reduce((acc, score) => acc + score, 0);
  this.averageScore = totalScores / allScores.length || 0;

//   Update Top Percentile Threshold (Top 10% of players)
  const sortedScores = [...allScores].sort((a, b) => b - a);
  const thresholdIndex = Math.floor(allScores.length * 0.1); // Top 10%
  this.topPercentThreshold = sortedScores[thresholdIndex] || 0;

  await this.save();
};

module.exports = mongoose.model("Game", GameSchema);
