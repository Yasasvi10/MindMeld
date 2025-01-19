import React, { useContext } from 'react';
import { 
  Brain,
  BarChart3,
  Target,
  GamepadIcon,
  Home as HomeIcon,
  LogOut
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useLogout } from '../hooks/UseLogout'
const Sidebar = ({ activePage, onSectionClick }) => {

  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (onSectionClick) {
      onSectionClick();
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">MindMeld</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button
            onClick={() => scrollToSection('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors
              ${activePage === 'overview' ? 'bg-gray-100 text-indigo-600' : 'text-gray-700'}`}
          >
            <HomeIcon className="h-5 w-5" />
            Overview
          </button>

          <button
            onClick={() => scrollToSection('insights')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors
              ${activePage === 'insights' ? 'bg-gray-100 text-indigo-600' : 'text-gray-700'}`}
          >
            <BarChart3 className="h-5 w-5" />
            Performance Insights
          </button>

          <button
            onClick={() => scrollToSection('priority-areas')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors
              ${activePage === 'priority-areas' ? 'bg-gray-100 text-indigo-600' : 'text-gray-700'}`}
          >
            <Target className="h-5 w-5" />
            Priority Areas
          </button>

          <button
            onClick={() => scrollToSection('games')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors
              ${activePage === 'games' ? 'bg-gray-100 text-indigo-600' : 'text-gray-700'}`}
          >
            <GamepadIcon className="h-5 w-5" />
            Recommended Games
          </button>
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;