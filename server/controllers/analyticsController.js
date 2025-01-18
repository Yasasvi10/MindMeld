const Game = require("../models/gameSchema");

const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all games and scores for the user
    const games = await Game.find({ "scores.userId": userId });

    let totalTestsCompleted = 0;
    let totalTimeInvested = 0; // Placeholder: Add duration field in `GameSchema` if needed
    let totalScore = 0;
    let consistency = 0;

    games.forEach((game) => {
      const userScores = game.scores.filter((score) => score.userId.equals(userId));
      totalTestsCompleted += userScores.length;

      const gameScoreSum = userScores.reduce((acc, score) => acc + score.score, 0);
      totalScore += gameScoreSum;

      consistency += userScores.length > 0 ? 1 : 0; // Increment consistency for each game played
    });

    const averageScore = totalTestsCompleted ? totalScore / totalTestsCompleted : 0;

    // Mocked time invested and consistency for now
    totalTimeInvested = "24h 30m"; // This should be calculated from actual data
    consistency = games.length > 0 ? (consistency / games.length) * 100 : 0;

    res.status(200).json({
      testsCompleted: totalTestsCompleted,
      averageScore: Math.round(averageScore),
      totalTimeInvested,
      consistency: Math.round(consistency),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch progress analytics" });
  }
};

module.exports = { getUserProgress };
