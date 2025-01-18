import React, { useState, useEffect } from 'react';
import { UseScore } from '../../../hooks/UseScore';

const ReactionTimeGame = ({ gameId, token }) => {
  const [isGreen, setIsGreen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalFlashes, setTotalFlashes] = useState(0);
  const [successfulClicks, setSuccessfulClicks] = useState(0);
  const { submitScore } = UseScore();

  // Handle circle clicks
  const handleClick = () => {
    if (!gameStarted) return;
    
    if (isGreen) {
      setSuccessfulClicks(prev => prev + 1);
      setIsGreen(false);
    }
  };

  // Control game timer and green flashes
  useEffect(() => {
    if (!gameStarted) return;

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
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
        setTotalFlashes(prev => prev + 1);
        
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
    setGameStarted(true);
    resetGame();
  };

  const endGame = () => {
    setGameStarted(false);
    
    const finalScore = totalFlashes > 0 
      ? Math.round((successfulClicks / totalFlashes) * 100)
      : 0;
    
    submitScore(gameId, finalScore, token);
  };

  const resetGame = () => {
    setTimeLeft(30);
    setTotalFlashes(0);
    setSuccessfulClicks(0);
    setIsGreen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Attention Test</h1>
        
        {/* Timer Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>

        {/* Timer Display */}
        <div className="mb-6 text-lg font-semibold text-gray-700">
          Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>

        {/* Instructions */}
        {!gameStarted && (
          <p className="text-gray-600 mb-6">
            Test your attention! Click the circle when it turns green.
            The green flash will be extremely brief - stay focused!
          </p>
        )}

        {/* Game Circle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleClick}
            disabled={!gameStarted}
            style={{ 
              backgroundColor: isGreen ? '#22c55e' : '#ef4444',
              transition: 'none'
            }}
            className={`w-32 h-32 rounded-full ${
              gameStarted ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
          />
        </div>

        {/* Start Button */}
        {!gameStarted && (
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