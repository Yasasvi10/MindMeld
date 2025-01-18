// import { useParams } from "react-router-dom";
// import ReactionTimeGame1 from "../components/games/reactionTime/numberMatchingGame";

// const CategoryGames = () => {
//   const { category } = useParams();

// //   const categoriesData = {
// //     1: ["Memory Game 1", "Memory Game 2"],
// //     2: ["Attention Game 1", "Attention Game 2"],
// //     3: ["Number Matching Game", "Reaction Time Game"],
// //     4: ["Problem Game 1", "Problem Game 2"],
// //   };
//   const categoriesData = [1,2,ReactionTimeGame1,4];

//   // Mock data for games (replace with API fetch in production)
//   const games = [
//     {
//       id: 1,
//       name: "Match the pairs",
//       description: "A fun and challenging memory game where you match card pairs after memorizing their positions.",
//       duration: "10 minutes",
//       category: "Memory",
//     },
//     {
//       id: 2,
//       name: "Reaction Time Game",
//       description: "This game measures how quickly a user responds to a sudden visual stimulus. The user must click as soon as the red circle turns green, with reaction time recorded for analysis, there by estimating user's attention.",
//       duration: "5 minutes",
//       category: "Attention",
//     },
//     {
//         id: 3,
//         name: "Number Matching Game",
//         description: "A number is displayed briefly, and the user has to click the matching number from a set of options that appear afterward.",
//         duration: "5 minutes",
//         category: "Reaction-time",
//       },
//       {
//         id: 4,
//         name: "FAST MATH GAME",
//         description: "Test your math skills by solving 10 quick questions under a timer. Boost your score with correct answers and challenge yourself to think fast!.",
//         duration: "5 minutes",
//         category: "Problem-Solving",
//       },
//     // Add more games here
//   ];

//   const filteredGames = games.filter((game) => game.category === category);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">{category} Games</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredGames.map((game) => (
//           <div key={game.id} className="border rounded-lg shadow-sm p-4 bg-white">
//             <h3 className="text-lg font-semibold text-gray-800">{game.name}</h3>
//             <p className="text-sm text-gray-500 mt-2">{game.description}</p>
//             <div className="flex justify-between items-center mt-4">
//               <p className="text-sm text-gray-600">{game.duration}</p>
//               <button className="bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600">
//                 Start Exercise
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



// export default CategoryGames;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactionTimeGame1 from "../components/games/reactionTime/numberMatchingGame";
import MemoryGame from "../components/games/memory/MemoryGame";
import FastMathGame from "../components/games/problemSolving/fastMath";
const CategoryGames = () => {
  const { category } = useParams();
  const [activeGame, setActiveGame] = useState(null); // State to track the active game

  const categoriesData = {
    1: () => <MemoryGame/>, // Replace with actual component
    2: () => <div>Memory Game 2 Component</div>, // Replace with actual component
    3: () => <ReactionTimeGame1 />, // Example of a real component
    4: () => <FastMathGame/>, // Replace with actual component
  };

  const games = [
    {
      id: 1,
      name: "Match the pairs",
      description:
        "A fun and challenging memory game where you match card pairs after memorizing their positions.",
      duration: "10 minutes",
      category: "Memory",
    },
    {
      id: 2,
      name: "Reaction Time Game",
      description:
        "This game measures how quickly a user responds to a sudden visual stimulus.",
      duration: "5 minutes",
      category: "Attention",
    },
    {
      id: 3,
      name: "Number Matching Game",
      description:
        "A number is displayed briefly, and the user has to click the matching number from a set of options that appear afterward.",
      duration: "5 minutes",
      category: "Reaction-time",
    },
    {
      id: 4,
      name: "FAST MATH GAME",
      description:
        "Test your math skills by solving 10 quick questions under a timer.",
      duration: "5 minutes",
      category: "Problem-Solving",
    },
  ];

  const filteredGames = games.filter((game) => game.category === category);

  const handleStartExercise = (id) => {
    setActiveGame(id); // Set the active game id
  };

  return (
    <div className="p-6">
      {/* Render the active game if selected */}
      {activeGame ? (
        <div>
          {/* <button
            onClick={() => setActiveGame(null)} // Reset to show the list of games
            className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
          >
            Back to Games
          </button> */}
          {categoriesData[activeGame] ? categoriesData[activeGame]() : <div>Game not found</div>}
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">{category} Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="border rounded-lg shadow-sm p-4 bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {game.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{game.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-600">{game.duration}</p>
                  <button
                    onClick={() => handleStartExercise(game.id)} // Set the game id when clicked
                    className="bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Start Exercise
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryGames;
