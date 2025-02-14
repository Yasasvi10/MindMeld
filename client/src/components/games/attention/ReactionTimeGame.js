import React, { useState, useEffect } from "react";
import { UseScore } from "../../../hooks/UseScore";
const ReactionTimeGame = () => {
  const [isGreen, setIsGreen] = useState(false);
  const [gameStarted, setGameStarted] = useState("start");
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalFlashes, setTotalFlashes] = useState(0);
  const [successfulClicks, setSuccessfulClicks] = useState(0);
  const [finaleScore, setFinaleScore] = useState(null);
  const { submitScore, isSubmitting, responseMessage, feedback, errorMessage } = UseScore();

  const gameId="678c2e8d179cd01f3f2859f8";
  // Calculate the current score percentage
  const currentScore =
    totalFlashes > 0 ? Math.round((successfulClicks / totalFlashes) * 100) : 0;

  // Handle circle clicks
  const handleClick = () => {
    if (gameStarted === "start") return;

    if (isGreen) {
      setSuccessfulClicks((prev) => prev + 1);
      setIsGreen(false);
    }
  };

  // Control game timer and green flashes
  useEffect(() => {
    if (gameStarted === "start" || gameStarted === "ended") return;

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Random green flashes
    const flashInterval = setInterval(() => {
      if (!isGreen) {
        setIsGreen(true);
        setTotalFlashes((prev) => prev + 1);

        // Turn off green after 500ms if not clicked
        setTimeout(() => {
          setIsGreen(false);
        }, 500);
      }
    }, Math.random() * 2000 + 1000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(flashInterval);
    };
  }, [gameStarted, isGreen]);

  const startGame = () => {
    setGameStarted("playing");
    setTimeLeft(30);
    setTotalFlashes(0);
    setSuccessfulClicks(0);
    setFinaleScore(null);
    setIsGreen(false);
    setFinaleScore(null);
  };

  const endGame = async () => {
    setGameStarted("ended");
    const finalScore =
      totalFlashes > 0 ? Math.round((successfulClicks / totalFlashes) * 100) : 0;
    setFinaleScore(finalScore);
    try {
        await submitScore(gameId, finalScore);
      } catch (error) {
        console.error("Error submitting score:", error);
      }
  };

  const resetGame = () => {
    setGameStarted("start");
    setTimeLeft(30);
    setTotalFlashes(0);
    setSuccessfulClicks(0);
    setFinaleScore(null);
    setIsGreen(false);
    startGame();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Attention Test</h1>

        {gameStarted === "playing" &&(/* Timer Bar */
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>
        )}

        {gameStarted === "playing" &&(/* Timer Display */
        <div className="mb-6 text-lg font-semibold text-gray-700">
          Time Left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
        )}

        {/* Current Score Display */}
        {gameStarted === "playing" && (
          <div className="mb-6 text-lg font-semibold text-blue-700">
            Current Score: {currentScore}/100
          </div>
        )}

        {/* Instructions */}
        {gameStarted === "start" && (
          <p className="text-gray-600 mb-6">
            Test your attention! Click the circle when it turns green. The green
            flash will be extremely brief - stay focused!
          </p>
        )}

        {gameStarted === "playing" &&(/* Game Circle */
        <div className="flex justify-center mb-6">
          <button
            onClick={handleClick}
            disabled={gameStarted === "start"}
            style={{
              backgroundColor: isGreen ? "#22c55e" : "#ef4444",
              transition: "none",
            }}
            className={`w-32 h-32 rounded-full ${
              gameStarted === "playing" ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          />
        </div>
        )}

        {gameStarted === "ended" && (
        <div className="results-container">
          <h2>Game Over!</h2>
          <p>Final Score: {finaleScore} / 100</p>
          <p>Total Green Circle Flashes: {totalFlashes}</p>
          <p>Correct Clicks: {successfulClicks}</p>
          {isSubmitting && <p>Submitting score...</p>}
          {responseMessage && <p>{responseMessage}</p>}
          {feedback && <p>Feedback: {feedback.feedback}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button className="start-button" onClick={resetGame}>
            Restart Game
          </button>
          <button className="home-button" onClick={resetGame}>
            Back to Home
          </button>
        </div>
      )}

        {/* Start Button */}
        {gameStarted === "start" && (
          <button
            onClick={startGame}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Start Game
          </button>
        )}

        
      </div>
    </div>
  );
};

export default ReactionTimeGame;
