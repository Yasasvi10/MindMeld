// import React, { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'

// const Home = () => {
//     const { user } = useContext(AuthContext)
//     return (
//         <div className="home max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow-md text-center">
//             <h1 className="text-3xl font-bold mb-4">Hello {user.usrname}</h1>
//             <h1 className="text-3xl font-bold mb-4"> welcome to the home page!</h1>
//             <p className="text-gray-700">We are glad to have you here.</p>
//         </div>
//     )
// }

// export default Home


import TestCard from "../components/testCard";

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
      category: "Reaction time",
      duration: "8 min",
      exercises: 5,
    },
    {
      id: 4,
      name: "Problem Solving",
      description: "Challenge your logical reasoning abilities",
      category: "Problem Solving",
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
