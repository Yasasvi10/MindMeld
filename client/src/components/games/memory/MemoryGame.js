import React, { useState, useEffect } from "react";
import { UseScore } from "../../../hooks/UseScore"; // Adjust path as needed

const MemoryGame = ({ gameId, token }) => {
  const [gridSize] = useState(4); // Grid size (4x4)
  const [revealTime] = useState(5000); // Initial reveal time
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [totalScore, setTotalScore] = useState(100);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [result, setResult] = useState(null);

  const { submitScore } = UseScore();

  // Timer logic
  useEffect(() => {
    if (!gameStarted) return;

    const timerInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameStarted]);

  const generateWideRangeColors = (count) => {
    const step = 360 / count;
    return Array.from({ length: count }, (_, i) => `hsl(${i * step}, 80%, 50%)`);
  };

  const generateRandomCards = (size) => {
    const numPairs = (size * size) / 2;
    const colors = generateWideRangeColors(numPairs);
    return [...colors, ...colors]
      .map((color, id) => ({ id, color, flipped: true, matched: false }))
      .sort(() => Math.random() - 0.5);
  };

  const updateScore = () => {
    const maxMoves = gridSize * gridSize * 3;
    const penaltyPerMove = 100 / maxMoves;

    setTotalScore((prev) => Math.max(0, prev - penaltyPerMove));
  };

  const handleCardClick = (card) => {
    if (lockBoard || card.flipped || card.matched || selectedCards.length >= 2) return;

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );
    setSelectedCards((prev) => [...prev, card]);

    if (selectedCards.length === 1) {
      setMovesCount((prev) => prev + 1);
      updateScore();

      const firstCard = selectedCards[0];
      if (firstCard.color === card.color) {
        setWinCount((prev) => prev + 1);
        setCards((prev) =>
          prev.map((c) =>
            c.color === card.color ? { ...c, matched: true } : c
          )
        );
        setSelectedCards([]);

        if (winCount + 1 === (gridSize * gridSize) / 2) {
          endGame(true);
        }
      } else {
        setLockBoard(true);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setSelectedCards([]);
          setLockBoard(false);
        }, 900);
      }
    }
  };

  const setupGame = () => {
    setMovesCount(0);
    setTimer(0);
    setWinCount(0);
    setTotalScore(100);
    setResult(null);

    const cardObjects = generateRandomCards(gridSize);
    setCards(cardObjects);

    setTimeout(() => {
      setCards((prev) => prev.map((c) => ({ ...c, flipped: false })));
      setGameStarted(true);
    }, revealTime);
  };

  const startGame = () => {
    setGameStarted(false);
    setupGame();
  };

  const endGame = async (win = false) => {
    setGameStarted(false);
    const formattedTime = `${Math.floor(timer / 60)
      .toString()
      .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;
    const message = win
      ? `Congratulations! You won! Score: ${totalScore.toFixed(
          2
        )} | Moves: ${movesCount} | Time: ${formattedTime}`
      : `Game Over! Score: ${totalScore.toFixed(
          2
        )} | Moves: ${movesCount} | Time: ${formattedTime}`;
    setResult(message);

    await submitScore(gameId, totalScore.toFixed(2), token);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center ">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Memory Game</h1>

        {/* Stats */}
        <div className="mb-4">
          <div>Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</div>
          <div>Moves: {movesCount}</div>
          <div>Score: {totalScore.toFixed(2)}</div>
        </div>

        {/* Controls */}
        <div className="mb-4">
          <button
            onClick={startGame}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
            disabled={gameStarted}
          >
            Start Game
          </button>
          <button
            onClick={() => endGame(false)}
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
            disabled={!gameStarted}
          >
            Stop Game
          </button>
        </div>

        {/* Result */}
        {result && <div className="text-lg font-semibold text-gray-700">{result}</div>}

        {/* Game Grid */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, auto)`,
            gridTemplateRows: `repeat(${gridSize}, auto)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card w-16 h-16 ${
                card.flipped ? "flipped" : ""
              } ${card.matched ? "matched" : ""}`}
              onClick={() => handleCardClick(card)}
              style={{
                backgroundColor: card.flipped || card.matched ? card.color : "gray",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
