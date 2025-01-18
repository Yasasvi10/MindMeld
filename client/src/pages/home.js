import TestCard from "../components/testCard";
import FastMathGame from '../components/games/problemSolving/fastMath';
const Home = () => {
   
  const tests = [
    {
      id: 1,
      name: "Memory Tests",
      description: "Test your ability to recall information after delays",
      category: "Memory",
      duration: "15 min",
      exercises: 4,
    },
    {
      id: 2,
      name: "Attention Tests",
      description: "Focus on identifying specific items among distractions",
      category: "Attention",
      duration: "10 min",
      exercises: 3,
    },
    {
      id: 3,
      name: "Reaction Tests",
      description: "Measure and improve your response time",
      category: "Reaction-time",
      duration: "8 min",
      exercises: 5,
    },
    {
      id: 4,
      name: "Problem Solving",
      description: "Challenge your logical reasoning abilities",
      category: "Problem-Solving",
      duration: "20 min",
      exercises: 6,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Cognitive Tests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
};

export default Home;
