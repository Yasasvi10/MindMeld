import { Link } from "react-router-dom";

const TestCard = ({ test }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white">
    <div>
        {test.logo}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{test.name}</h3>
      <p className="text-sm text-gray-500 mt-2">{test.description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          {test.exercises} exercises ~ {test.duration}
        </p>
        <Link
          to={`/tests/${test.category}`}
          className="bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600"
        > Start Test
        </Link>
      </div>
    </div>
    
  );
};

export default TestCard;
