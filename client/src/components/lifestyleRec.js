import React from 'react';

const Recommendations = ({ scores }) => {
  const recommendationDescriptions = {
    'Sleep Schedule': 'Maintain a consistent sleep schedule of 7-9 hours per night to improve memory consolidation and cognitive performance.',
    'Regular Exercise': 'Incorporate 30 minutes of moderate exercise daily to enhance brain function and improve cognitive performance.',
    'Regular Breaks': 'Take a 5-minute break every hour to maintain focus and prevent cognitive fatigue during work or study sessions.',
    'Meditation': 'Practice 10-15 minutes of daily meditation to enhance attention span and mental clarity.',
    'Social Activities': 'Engage in social activities regularly to stimulate cognitive function and emotional well-being.',
    'Morning Routine': 'Establish a consistent morning routine to optimize cognitive performance throughout the day.',
    'Brain Training': 'Dedicate 20 minutes daily to brain training exercises that target specific cognitive skills.',
    'Caffeine Management': 'Optimize caffeine intake timing and amount to support sustained attention and alertness.',
    'Mindfulness Practice': 'Include mindfulness exercises in your daily routine to improve focus and reduce mental fatigue.',
    'Cardiovascular Health': 'Focus on activities that promote cardiovascular health to support optimal brain function.',
  };

  // Sample scores object (should be passed as a prop)
  // Example: scores = { memory: 85, attention: 70, reaction: 60, problemSolving: 50 };
  const categories = Object.keys(scores);

  // Logic to select recommendations based on scores
  const getRecommendations = () => {
    const recommendations = [];

    categories.forEach((category) => {
      const score = scores[category];
      if (score >= 80) {
        // High score: no improvement needed
        recommendations.push({
          title: `${category} Maintenance`,
          description: `Your ${category} score is excellent! Maintain your current habits to sustain this level.`,
        });
      } else if (score >= 60) {
        // Medium score: minor improvement recommendations
        recommendations.push({
          title: recommendationDescriptions['Regular Breaks'],
          description: `Your ${category} score is decent but can improve. Consider taking short, regular breaks to boost your performance.`,
        });
      } else {
        // Low score: targeted recommendation
        if (category === 'memory') {
          recommendations.push({
            title: 'Sleep Schedule',
            description: recommendationDescriptions['Sleep Schedule'],
          });
        } else if (category === 'attention') {
          recommendations.push({
            title: 'Meditation',
            description: recommendationDescriptions['Meditation'],
          });
        } else if (category === 'reaction') {
          recommendations.push({
            title: 'Regular Exercise',
            description: recommendationDescriptions['Regular Exercise'],
          });
        } else if (category === 'problemSolving') {
          recommendations.push({
            title: 'Brain Training',
            description: recommendationDescriptions['Brain Training'],
          });
        }
      }
    });

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="flex flex-col items-center bg-gray-100 py-10">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">
        Your Personalized Recommendations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {rec.title}
            </h3>
            <p className="text-sm text-gray-600">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
