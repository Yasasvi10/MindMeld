const GameCard = ({ game }) => (
    <div className="border rounded-lg shadow-sm p-4 bg-white">
      <h3 className="text-lg font-semibold text-gray-800">{game.name}</h3>
      <p className="text-sm text-gray-500 mt-2">{game.description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">{game.duration}</p>
        <button className="bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600">
          Start Exercise
        </button>
      </div>
    </div>
  );
  
  export default GameCard;
  