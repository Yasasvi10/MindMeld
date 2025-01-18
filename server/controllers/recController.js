// const Recommendation = require('../models/recSchema'); // Import the recommendation schema
// const Game = require('../models/gameSchema'); // Import the game schema

// // Generate Recommendations
// const generateRecommendations = async (userId) => {
//   const games = await Game.find({ "scores.userId": userId });

//   const priorityAreas = [];
//   const exercises = [];
//   const lifestyleRecommendations = [
//     {
//       name: "Regular Breaks",
//       description: "Take short breaks every hour to improve focus and productivity.",
//     },
//     {
//       name: "Sleep Schedule",
//       description: "Maintain a consistent sleep routine to enhance cognitive performance.",
//     },
//   ];

//   for (const game of games) {
//     const userScoreEntry = game.scores.find((entry) => entry.userId.toString() === userId.toString());
//     const userScore = userScoreEntry ? userScoreEntry.score : 0;

//     if (userScore < 70) {
//       priorityAreas.push({
//         area: game.category,
//         description: `Your ${game.category.toLowerCase()} score shows room for improvement. Focus on this area.`,
//         currentScore: userScore,
//         targetScore: 80,
//       });

//       // Suggest the game with name, description, and duration
//       exercises.push({
//         name: game.name,
//         description: game.description,
//         duration: "10 minutes", // Set recommended time for the game
//       });
//     }
//   }

//   return {
//     userId,
//     priorityAreas,
//     exercises,
//     lifestyleRecommendations,
//   };
// };

// // Recommendation Controller
// const getRecommendations = async (req, res) => {
//   const { userId } = req.user; // Extract user ID from authenticated middleware

//   try {
//     // Generate personalized recommendations
//     const recommendations = await generateRecommendations(userId);

//     // Save or update recommendations in the database
//     const updatedRecommendations = await Recommendation.findOneAndUpdate(
//       { userId },
//       recommendations,
//       { new: true, upsert: true } // Update or insert if not found
//     );

//     res.status(200).json(updatedRecommendations);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// module.exports = { getRecommendations };

const User = require('../models/userSchema');
const Game = require('../models/gameSchema');

const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const allGames = await Game.find({});

    // Calculate performance percentiles for each category
    const categoryPerformance = user.categoryPerformance;
    const priorityAreas = Object.entries(categoryPerformance)
      .map(([category, stats]) => ({
        category,
        averageScore: stats.averageScore||0,
        gamesPlayed: stats.gamesPlayed,
      }))
      .sort((a, b) => a.averageScore - b.averageScore);

    // Get recommended games for each category
    const recommendedGames = {};
    for (const game of allGames) {
      if (!recommendedGames[game.category]) {
        recommendedGames[game.category] = game;
      }
    }

    // Generate feedback messages
    const recommendations = priorityAreas.map(area => ({
      category: area.category,
      currentScore: Math.round(area.averageScore),
      targetScore: Math.round(area.averageScore * 1.2), // 20% improvement target
      message: generateFeedbackMessage(area),
      recommendedGame: recommendedGames[area.category]
    }));

    res.status(200).json({
      priorityAreas: recommendations.slice(0, 3), // Top 3 priority areas
      allCategories: recommendations
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateFeedbackMessage = (area) => {
  const score = area.averageScore;
  if (score < 50) {
    return `Your ${area.category.toLowerCase()} scores show room for improvement. Focus on these exercises to enhance this skill.`;
  } else if (score < 75) {
    return `You're making progress in ${area.category.toLowerCase()}. Regular practice will help you improve further.`;
  } else {
    return `You're performing well in ${area.category.toLowerCase()}. Keep challenging yourself to maintain progress.`;
  }
};

module.exports = {
  getRecommendations
};