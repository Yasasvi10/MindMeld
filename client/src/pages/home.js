// export default Home;
import { useEffect, useState,useContext } from "react";
import TestCard from "../components/testCard";
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
      logo:(
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4" id="el-6e5ofzjj">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-19vvlnrj">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" id="el-20mnspn9"></path>
                    </svg>
        </div>
      )
    },
    {
      id: 2,
      name: "Attention Tests",
      description: "Focus on identifying specific items among distractions",
      category: "Attention",
      duration: "10 min",
      exercises: 3,
      logo:(
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4" id="el-m0pixu07">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-j57z45t1">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" id="el-qlpcu3nf"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" id="el-iatcjvg9"></path>
                    </svg>
        </div>
      )
    },
    {
      id: 3,
      name: "Reaction Tests",
      description: "Measure and improve your response time",
      category: "Reaction-time",
      duration: "8 min",
      exercises: 5,
      logo:(
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4" id="el-5ilpkl3o">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-dp84097b">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" id="el-84xdvocy"></path>
                    </svg>
        </div>
      )
    },
    {
      id: 4,
      name: "Problem Solving",
      description: "Challenge your logical reasoning abilities",
      category: "Problem-Solving",
      duration: "20 min",
      exercises: 6,
      logo:(
        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4" id="el-86y3807j">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-ox8jfr2p">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" id="el-8pw4yu43"></path>
            </svg>
        </div>
      )
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
