// export default Home;
import { useEffect, useState,useContext } from "react";
import TestCard from "../components/testCard";
import FastMathGame from '../components/games/problemSolving/fastMath';
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const token = user ? user.token : null;
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState(null);

  const fetchAnalyticsData = async () => {
    try {
        console.log(token)
    //   const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await fetch("/api/analytics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

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

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  if (!analyticsData) return <p>Loading...</p>;

  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Cognitive Tests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
        <FastMathGame/>
       </div>
      <h2 className="text-2xl font-bold mb-6 p-4">Overall Progress</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h4 className="text-md font-bold">Tests Completed</h4>
          <p className="text-2xl font-bold text-gray-800">
            {analyticsData.testsCompleted}
          </p>
          <p className="text-sm text-green-500 mt-2">
            ↑ {analyticsData.changes.testsCompleted}% from last week
          </p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h4 className="text-md font-bold">Average Score</h4>
          <p className="text-2xl font-bold text-gray-800">
            {analyticsData.averageScore}%
          </p>
          <p className="text-sm text-green-500 mt-2">
            ↑ {analyticsData.changes.averageScore}% from last week
          </p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h4 className="text-md font-bold">Time Invested</h4>
          <p className="text-2xl font-bold text-gray-800">
            {analyticsData.totalTimeInvested}
          </p>
          <p className="text-sm text-green-500 mt-2">
            ↑ {analyticsData.changes.timeInvested}% from last week
          </p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h4 className="text-md font-bold">Consistency</h4>
          <p className="text-2xl font-bold text-gray-800">
            {analyticsData.consistency}%
          </p>
          <p className="text-sm text-green-500 mt-2">
            ↑ {analyticsData.changes.consistency}% from last week
          </p>
        </div>
      </div>
       
    </div>
  );
};

export default Home;
