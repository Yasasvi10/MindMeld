const Recommendation = require('../models/recSchema'); // Import the recommendation schema
const Game = require('../models/gameSchema'); // Import the game schema

// Generate Recommendations
const generateRecommendations = async (userId) => {
  const games = await Game.find({ "scores.userId": userId });

  const priorityAreas = [];
  const exercises = [];
  const lifestyleRecommendations = [
    {
      name: "Regular Breaks",
      description: "Take short breaks every hour to improve focus and productivity.",
    },
    {
      name: "Sleep Schedule",
      description: "Maintain a consistent sleep routine to enhance cognitive performance.",
    },
  ];

  for (const game of games) {
    const userScoreEntry = game.scores.find((entry) => entry.userId.toString() === userId.toString());
    const userScore = userScoreEntry ? userScoreEntry.score : 0;

    if (userScore < 70) {
      priorityAreas.push({
        area: game.category,
        description: `Your ${game.category.toLowerCase()} score shows room for improvement. Focus on this area.`,
        currentScore: userScore,
        targetScore: 80,
      });

      // Suggest the game with name, description, and duration
      exercises.push({
        name: game.name,
        description: game.description,
        duration: "10 minutes", // Set recommended time for the game
      });
    }
  }

  return {
    userId,
    priorityAreas,
    exercises,
    lifestyleRecommendations,
  };
};

// Recommendation Controller
const getRecommendations = async (req, res) => {
  const { userId } = req.user; // Extract user ID from authenticated middleware

  try {
    // Generate personalized recommendations
    const recommendations = await generateRecommendations(userId);

    // Save or update recommendations in the database
    const updatedRecommendations = await Recommendation.findOneAndUpdate(
      { userId },
      recommendations,
      { new: true, upsert: true } // Update or insert if not found
    );

    res.status(200).json(updatedRecommendations);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getRecommendations };
