const User = require('../models/userSchema')
const Game = require('../models/gameSchema')

const generateDynamicFeedback = async (gameId, userScore) => {
    const game = await Game.findById(gameId);
  
    if (!game) throw new Error("Game not found");
  
    // Calculate the average score dynamically
    const allScores = game.scores.map((entry) => entry.score);
    const totalScores = allScores.reduce((acc, score) => acc + score, 0);
    const avgScore = totalScores / allScores.length || 0;
  
    // Determine percentile rank
    const sortedScores = [...allScores].sort((a, b) => b - a);
    const rank = sortedScores.indexOf(userScore) + 1;
    const percentile = ((sortedScores.length - rank) / sortedScores.length) * 100;
  
    // Generate motivational message
    let feedback;
    if (percentile === 100) { 
        feedback = `Outstanding! You belong to the top 1% of players!`;
    } 
    else if (userScore >= game.topPercentThreshold) {
      feedback = `Outstanding! You belong to the top ${Math.ceil(100 - percentile)}% of players!`;
    } else if (userScore > avgScore) {
      feedback = `Great work! Your score is ${Math.round(userScore - avgScore)} points above the average (${Math.round(avgScore)}).`;
    } else {
      feedback = `Keep practicing! You're only ${Math.round(avgScore - userScore)} points below the average (${Math.round(avgScore)}).`;
    }
  
    return {
      feedback,
      percentile: Math.round(percentile),
      averageScore: Math.round(avgScore),
    };
  };


const submitScore = async (req, res) => {
    const { gameId } = req.params;
    const { score } = req.body;
  
    try {
      const game = await Game.findById(gameId);
      if (!game) return res.status(404).send("Game not found");
  
      // Add the new score
      game.scores.push({ userId: req.user._id, score });
      await game.save();
  
      // Update average score and top percentile threshold dynamically
      await game.updateStats();
  
      // Generate feedback
      const feedback = await generateDynamicFeedback(gameId, score);
  
      res.status(200).json({
        message: "Score submitted successfully!",
        feedback,
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  


const createGame = async (req, res) => {
  const { name, description, category } = req.body;

  try {
    const newGame = new Game({
      name,
      description,
      category,
    });

    await newGame.save();
    res.status(201).json({
      message: "Game created successfully!",
      game: newGame,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  submitScore,
  createGame,  // Export createGame
};


