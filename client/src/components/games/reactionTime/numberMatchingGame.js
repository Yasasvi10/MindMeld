// import React, { useState, useEffect } from "react";
// import "./game.css";

// const ReactionTimeGame1 = () => {
//   const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'ended'
//   const [targetNumber, setTargetNumber] = useState(null);
//   const [options, setOptions] = useState([]);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [totalAttempts, setTotalAttempts] = useState(0);
//   const [reactionTimes, setReactionTimes] = useState([]);
//   const [startTime, setStartTime] = useState(null); // Start time of the current question
//   const [timer, setTimer] = useState(60); // Game timer
//   const [finalScore, setFinalScore] = useState(null);
//   const [averageReactionTime, setAverageReactionTime] = useState(null);

//   // Timer management
//   useEffect(() => {
//     let interval;
//     if (gameState === "playing" && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else if (timer === 0) {
//       endGame();
//     }
//     return () => clearInterval(interval);
//   }, [gameState, timer]);

//   const startGame = () => {
//     setGameState("playing");
//     setTimer(60);
//     setCorrectAnswers(0);
//     setTotalAttempts(0);
//     setReactionTimes([]);
//     setFinalScore(null);
//     setAverageReactionTime(null);
//     generateQuestion();
//   };

//   const generateQuestion = () => {
//     const newTarget = generateRandomNumber(1, 999); // Random number between 1 and 999
//     const optionsArray = [
//       newTarget,
//       ...Array(15)
//         .fill(0)
//         .map(() => generateRandomNumber(1, 999)), // Options between 1 and 999
//     ];
//     setTargetNumber(newTarget);
//     setOptions(shuffleArray(optionsArray));
//     setStartTime(Date.now());
//   };

//   const generateRandomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   };

//   const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

//   const handleOptionClick = (option) => {
//     const reactionTime = Date.now() - startTime;
//     setReactionTimes((prev) => [...prev, reactionTime]);
//     setTotalAttempts((prev) => prev + 1);

//     if (option === targetNumber) {
//       setCorrectAnswers((prev) => prev + 1);
//     }
//     generateQuestion();
//   };

//   const endGame = () => {
//     setGameState("ended");

//     // Calculate final score and average reaction time
//     const accuracy = correctAnswers / totalAttempts || 0;
//     const avgReactionTime =
//       reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length || 0;

//     // Final score (out of 100)
//     const reactionScore = Math.max(0, 50 - avgReactionTime / 20); // Reaction time contributes 50% (faster is better)
//     const accuracyScore = accuracy * 50; // Accuracy contributes 50%
//     const totalScore = reactionScore + accuracyScore;

//     setAverageReactionTime(avgReactionTime);
//     setFinalScore(totalScore.toFixed(2));
//   };

//   const restartGame = () => {
//     setGameState("start");
//     setTargetNumber(null);
//     setOptions([]);
//     setCorrectAnswers(0);
//     setTotalAttempts(0);
//     setReactionTimes([]);
//     setStartTime(null);
//     setTimer(60);
//     setFinalScore(null);
//     setAverageReactionTime(null);
//     startGame();
//   };

//   return (
//     <div className="game-container">
//       {gameState === "start" && (
//         <button className="start-button" onClick={startGame}>
//           Start Game
//         </button>
//       )}

//       {gameState === "playing" && (
//         <>
//           <div className="game-info">
//             <p>Time Left: {timer}s</p>
//             <p>Correct Answers: {correctAnswers}</p>
//             <p>Total Attempts: {totalAttempts}</p>
//           </div>
//           <div className="game-target">
//             <p>Match this number:</p>
//             <h1 className="target-number">{targetNumber}</h1>
//           </div>
//           <div className="game-options-grid">
//             {options.map((option, index) => (
//               <button
//                 key={index}
//                 className="option-button"
//                 onClick={() => handleOptionClick(option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </>
//       )}

//       {gameState === "ended" && (
//         <div className="results-container">
//           <h2>Game Over!</h2>
//           <p>Final Score: {finalScore} / 100</p>
//           <p>Average Reaction Time: {averageReactionTime.toFixed(2)} ms</p>
//           <p>Correct Answers: {correctAnswers}</p>
//           <p>Total Attempts: {totalAttempts}</p>
//           <button className="start-button" onClick={restartGame}>
//             Restart Game
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReactionTimeGame1;

import React, { useState, useEffect } from "react";
import { UseScore } from "../../../hooks/UseScore";
import "./game.css";

const ReactionTimeGame1 = () => {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'ended'
  const [targetNumber, setTargetNumber] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [startTime, setStartTime] = useState(null); // Start time of the current question
  const [timer, setTimer] = useState(60); // Game timer
  const [finalScore, setFinalScore] = useState(null);
  const [averageReactionTime, setAverageReactionTime] = useState(null);
  

  const {
    submitScore,
    isSubmitting,
    responseMessage,
    feedback,
    errorMessage,
  } = UseScore();

  const gameId = "678c1bd122b8b59124dfe654";
  // Timer management
  useEffect(() => {
    let interval;
    if (gameState === "playing" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  const startGame = () => {
    setGameState("playing");
    setTimer(10);
    setCorrectAnswers(0);
    setTotalAttempts(0);
    setReactionTimes([]);
    setFinalScore(null);
    setAverageReactionTime(null);
    generateQuestion();
  };

  const generateQuestion = () => {
    const newTarget = generateRandomNumber(1, 999); // Random number between 1 and 999
    const optionsArray = [
      newTarget,
      ...Array(15)
        .fill(0)
        .map(() => generateRandomNumber(1, 999)),
    ];
    setTargetNumber(newTarget);
    setOptions(shuffleArray(optionsArray));
    setStartTime(Date.now());
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleOptionClick = (option) => {
    const reactionTime = Date.now() - startTime;
    setReactionTimes((prev) => [...prev, reactionTime]);
    setTotalAttempts((prev) => prev + 1);

    if (option === targetNumber) {
      setCorrectAnswers((prev) => prev + 1);
    }
    generateQuestion();
  };

  const endGame = async () => {
    if (isSubmitting) return;
    setGameState("ended");

    // Calculate final score and average reaction time
    const accuracy = correctAnswers / totalAttempts || 0;
    const avgReactionTime =
      reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length || 0;

    const reactionScore = Math.max(0, 50 - avgReactionTime / 20); // Reaction time contributes 50%
    const accuracyScore = accuracy * 50; // Accuracy contributes 50%
    const totalScore = reactionScore + accuracyScore;

    setAverageReactionTime(avgReactionTime);
    setFinalScore(totalScore.toFixed(2));

    // Submit the score to the backend
    try {
      await submitScore(gameId, totalScore.toFixed(2));
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const restartGame = () => {
    setGameState("start");
    setTargetNumber(null);
    setOptions([]);
    setCorrectAnswers(0);
    setTotalAttempts(0);
    setReactionTimes([]);
    setStartTime(null);
    setTimer(60);
    setFinalScore(null);
    setAverageReactionTime(null);
    startGame();
  };

  return (
    <div className="game-container">
      {gameState === "start" && (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      )}

      {gameState === "playing" && (
        <>
          <div className="game-info">
            <p>Time Left: {timer}s</p>
            <p>Correct Answers: {correctAnswers}</p>
            <p>Total Attempts: {totalAttempts}</p>
          </div>
          <div className="game-target">
            <p>Match this number:</p>
            <h1 className="target-number">{targetNumber}</h1>
          </div>
          <div className="game-options-grid">
            {options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}

      {gameState === "ended" && (
        <div className="results-container">
          <h2>Game Over!</h2>
          <p>Final Score: {finalScore} / 100</p>
          <p>Average Reaction Time: {averageReactionTime?.toFixed(2)} ms</p>
          <p>Correct Answers: {correctAnswers}</p>
          <p>Total Attempts: {totalAttempts}</p>
          {isSubmitting && <p>Submitting score...</p>}
          {responseMessage && <p>{responseMessage}</p>}
          {feedback && <p>Feedback: {feedback.feedback}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button className="start-button" onClick={restartGame}>
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default ReactionTimeGame1;
