import React, { useState, useEffect } from 'react';
import { UseScore } from '../../../hooks/UseScore'; // Correct import for named export
// import './FastMath.css'; // Optional for custom styles

function FastMathGame({ token, gameId }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [question, setQuestion] = useState({});
  const [options, setOptions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const totalQuestions = 10;

  const { submitScore, isSubmitting, responseMessage } = UseScore(); // Destructure necessary fields from the custom hook

  // Generate a random math question
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let answer;
    if (operation === '+') answer = num1 + num2;
    if (operation === '-') answer = num1 - num2;
    if (operation === '*') answer = num1 * num2;
    if (operation === '/') answer = parseFloat((num1 / num2).toFixed(1));

    const wrongAnswers = Array.from({ length: 3 }, () => {
      let wrong;
      do {
        wrong = answer + Math.floor(Math.random() * 10 - 5);
      } while (wrong === answer);
      return wrong;
    });

    const options = [...wrongAnswers, answer].sort(() => Math.random() - 0.5);
    setQuestion({ num1, num2, operation, answer });
    setOptions(options);
  };

  // Handle option click
  const handleOptionClick = (selected) => {
    if (selected === question.answer) {
      setScore(score + 1);
    }
    if (questionNumber < totalQuestions) {
      setQuestionNumber(questionNumber + 1);
      setTimeLeft(10);
      generateQuestion();
    } else {
      gameId="678beeef66c4ffa0ed1401f7";
      submitScore(gameId, score, token); // Send final score to the backend
      console.log("hey",gameId)
    }
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        if (questionNumber < totalQuestions) {
          setQuestionNumber(questionNumber + 1);
          setTimeLeft(10);
          generateQuestion();
        } else {
          gameId="678beeef66c4ffa0ed1401f7";
          submitScore(gameId, score, token); // Send final score to the backend when the game ends
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Fast Math Game</h1>

        {/* Timer Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-100"
            style={{ width: `${(timeLeft / 10) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Question {questionNumber}/{totalQuestions}
        </h2>
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          {question.num1} {question.operation} {question.num2} = ?
        </h3>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              disabled={isSubmitting}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Score */}
        <p className="text-lg text-gray-600">Score: {score}</p>
        {responseMessage && <p className="text-green-500 mt-4">{responseMessage}</p>}
      </div>
    </div>
  );
}

export default FastMathGame;
