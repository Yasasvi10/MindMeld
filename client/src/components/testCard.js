import { Link } from "react-router-dom";

const TestCard = ({ test }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white">
      
      <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4" id="el-y012hefx">
        <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-7xct1omn">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" id="el-q59b5hdl"></path>
        </svg>
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
        >
        </Link>
      </div>
    </div>
    /*<div class="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-all cursor-pointer" id="el-dtsvwsum">
    <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4" id="el-y012hefx">
        <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-7xct1omn">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" id="el-q59b5hdl"></path>
        </svg>
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2" id="el-4iuoddx5">Memory Tests</h3>
    <p class="text-gray-600 text-sm mb-4" id="el-iyed3tpj">Test your ability to recall information after delays</p>
    <div class="flex justify-between items-center" id="el-ckxo2g3o">
        <span class="text-sm text-indigo-600" id="el-3306f0ml">4 exercises</span>
        <span class="text-sm text-gray-500" id="el-kwviv9r0">~15 min</span>
    </div>
</div>*/
  );
};

export default TestCard;
