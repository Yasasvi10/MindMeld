const Game = require("../models/gameSchema");

// exports.getAnalytics = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     // Fetch all games played by the user
//     const games = await Game.find({ "scores.userId": userId });

//     let totalTests = 0;
//     let totalTimeInvested = 0; // In minutes
//     let averageScore = 0;
//     let consistency = 0;
//     let lastWeekTests = 0;
//     let lastWeekConsistency = 0;

//     const now = new Date();
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(now.getDate() - 7);

//     games.forEach((game) => {
//       const userScores = game.scores.filter((score) => score.userId.toString() === userId.toString());

//       totalTests += userScores.length;

//       // Calculate total time invested (assuming each test is 10 minutes)
//       totalTimeInvested += userScores.length * 10; // Replace with actual time if stored.

//       // Calculate average score
//       const totalScore = userScores.reduce((acc, curr) => acc + curr.score, 0);
//       averageScore += totalScore;

//       // Count tests from last week
//       const lastWeekScores = userScores.filter((score) => score.date >= oneWeekAgo && score.date <= now);
//       lastWeekTests += lastWeekScores.length;

//       // Consistency for last week = (Tests Completed / Total Days in the Period)
//       const totalDays = 7; // Fixed for the last week
//       lastWeekConsistency += (lastWeekScores.length / totalDays) * 100;
//     });

//     averageScore = totalTests > 0 ? averageScore / totalTests : 0;
//     const totalDays = 7; // Fixed for last week
//     consistency = (totalTests / totalDays) * 100;

//     // Format total time invested into hours and minutes
//     const hours = Math.floor(totalTimeInvested / 60);
//     const minutes = totalTimeInvested % 60;
//     const formattedTimeInvested = `${hours}h ${minutes}m`;

//     res.status(200).json({
//       testsCompleted: totalTests,
//       averageScore: Math.round(averageScore),
//       totalTimeInvested: formattedTimeInvested,
//       consistency: Math.round(consistency),
//       changes: {
//         testsCompleted: Math.round(((totalTests - lastWeekTests) / lastWeekTests) * 100) || 100,
//         consistency: Math.round(((consistency - lastWeekConsistency) / lastWeekConsistency) * 100) || 100,
//         averageScore: 5, // Example placeholder logic for score change
//         timeInvested: 8, // Example placeholder logic for time change
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch analytics data" });
//   }
// };

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all games played by the user
    const games = await Game.find({ "scores.userId": userId });

    let totalTests = 0;
    let totalTimeInvested = 0; // In minutes
    let averageScore = 0;
    let consistency = 0;
    let lastWeekTests = 0;
    let lastWeekConsistency = 0;
    let lastWeekTotalTime = 0;
    let lastWeekTotalScore = 0;

    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    games.forEach((game) => {
      const userScores = game.scores.filter((score) => score.userId.toString() === userId.toString());

      totalTests += userScores.length;

      // Calculate total time invested (assuming each test is 10 minutes)
      totalTimeInvested += userScores.length * 10; // Replace with actual time if stored.

      // Calculate average score
      const totalScore = userScores.reduce((acc, curr) => acc + curr.score, 0);
      averageScore += totalScore;

      // Count tests from last week
      const lastWeekScores = userScores.filter((score) => score.date >= oneWeekAgo && score.date <= now);
      lastWeekTests += lastWeekScores.length;

      // Consistency for last week = (Tests Completed / Total Days in the Period)
      const totalDays = 7; // Fixed for the last week
      lastWeekConsistency += (lastWeekScores.length / totalDays) * 100;

      // Track time and score for last week
      lastWeekTotalTime += lastWeekScores.length * 10; // Assuming 10 minutes per test
      lastWeekTotalScore += lastWeekScores.reduce((acc, curr) => acc + curr.score, 0);
    });

    // Calculate final average score
    averageScore = totalTests > 0 ? averageScore / totalTests : 0;

    // Calculate overall consistency (tests completed over the last week)
    consistency = totalTests > 0 ? (totalTests / 7) * 100 : 0;

    // Format total time invested into hours and minutes
    const hours = Math.floor(totalTimeInvested / 60);
    const minutes = totalTimeInvested % 60;
    const formattedTimeInvested = `${hours}h ${minutes}m`;

    // Calculate percentage change for average score and time invested
    const lastWeekAverageScore = lastWeekTests > 0 ? lastWeekTotalScore / lastWeekTests : 0;
    console.log(lastWeekAverageScore)
    const averageScoreChange = lastWeekAverageScore > 0 
      ? ((averageScore - lastWeekAverageScore) / lastWeekAverageScore) * 100 
      : 100;

    const timeInvestedChange = lastWeekTotalTime > 0 
      ? ((totalTimeInvested - lastWeekTotalTime) / lastWeekTotalTime) * 100 
      : 100;

    res.status(200).json({
      testsCompleted: totalTests,
      averageScore: Math.round(averageScore),
      totalTimeInvested: formattedTimeInvested,
      consistency: Math.round(consistency),
      changes: {
        testsCompleted: Math.round(((totalTests - lastWeekTests) / lastWeekTests) * 100) || 100,
        consistency: Math.round(((consistency - lastWeekConsistency) / lastWeekConsistency) * 100) || 100,
        averageScore: Math.round(averageScoreChange) || 100, // Dynamic calculation of average score change
        timeInvested: Math.round(timeInvestedChange) || 100, // Dynamic calculation of time invested change
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
};

const moment = require('moment');

exports.getInsights = async (req, res) => {
    try {
        const user = req.user;
        const timeframe = req.query.timeframe || '30'; // Default to 30 days
        const daysAgo = moment().subtract(timeframe, 'days').toDate();

        // Filter recent scores within timeframe
        if (!user.recentScores) user.recentScores = [];
        if (!user.categoryPerformance) user.categoryPerformance = {};
        const recentScores = user.recentScores.filter(score => 
            moment(score.date).isAfter(daysAgo)
        );

        const categories = Object.keys(user.categoryPerformance).length > 0 
            ? Object.keys(user.categoryPerformance)
            : ['Memory', 'Attention', 'Reaction time', 'Problem Solving'];
        // Group scores by category
        const scoresByCategory = {};
        const categoryTrends = {};
        //const categories = Object.keys(user.categoryPerformance);

        categories.forEach(category => {
            const categoryScores = recentScores
                .filter(score => score.category === category)
                .map(score => ({
                    score: score.score,
                    date: score.date
                }))
                .sort((a, b) => moment(a.date).diff(moment(b.date)));

            scoresByCategory[category] = categoryScores;

            const categoryPerf = user.categoryPerformance[category] || { 
                averageScore: 0, 
                gamesPlayed: 0 
            };
            // Calculate improvement trends
            if (categoryScores.length >= 2) {
                const firstScore = categoryScores[0].score;
                const lastScore = categoryScores[categoryScores.length - 1].score;
                const improvement = ((lastScore - firstScore) / firstScore * 100).toFixed(1);
                categoryTrends[category] = {
                    improvement: parseFloat(improvement),
                    currentScore: lastScore,
                    gamesPlayed: user.categoryPerformance[category].gamesPlayed
                };
            }
            else {
                // Provide default values if not enough data
                categoryTrends[category] = {
                    improvement: 0,
                    currentScore: categoryPerf.averageScore,
                    gamesPlayed: categoryPerf.gamesPlayed
            };
           }
        });

        // Calculate daily averages for performance over time
    //     const dailyAverages = recentScores.reduce((acc, score) => {
    //         const day = moment(score.date).format('YYYY-MM-DD');
    //         if (!acc[day]) {
    //             acc[day] = { total: 0, count: 0 };
    //         }
    //         acc[day].total += score.score;
    //         acc[day].count += 1;
    //         return acc;
    //     }, {});

    //     const performanceOverTime = Object.entries(dailyAverages).map(([date, data]) => ({
    //         date,
    //         averageScore: data.total / data.count
    //     })).sort((a, b) => moment(a.date).diff(moment(b.date)));

    //     // Calculate strengths and weaknesses
    //     const strengthsAndWeaknesses = categories
    //         .map(category => ({
    //             category,
    //             averageScore: user.categoryPerformance[category].averageScore,
    //             gamesPlayed: user.categoryPerformance[category].gamesPlayed
    //         }))
    //         .sort((a, b) => b.averageScore - a.averageScore);

    //     const insights = {
    //         scoresByCategory,
    //         categoryTrends,
    //         performanceOverTime,
    //         strengthsAndWeaknesses: {
    //             strengths: strengthsAndWeaknesses.slice(0, 2),
    //             weaknesses: strengthsAndWeaknesses.slice(-2).reverse()
    //         }
    //     };

    //     res.status(200).json(insights);
    const performanceOverTime = [];
    const dailyScores = {};

    recentScores.forEach(score => {
        const day = moment(score.date).format('YYYY-MM-DD');
        if (!dailyScores[day]) {
            dailyScores[day] = { total: 0, count: 0 };
        }
        dailyScores[day].total += score.score;
        dailyScores[day].count += 1;
    });

    // Convert daily scores to array format
    Object.entries(dailyScores).forEach(([date, data]) => {
        performanceOverTime.push({
            date,
            averageScore: data.total / data.count
        });
    });
    performanceOverTime.sort((a, b) => moment(a.date).diff(moment(b.date)));

    // Calculate strengths and weaknesses
    const strengthsAndWeaknesses = categories
        .map(category => ({
            category,
            averageScore: (user.categoryPerformance[category]?.averageScore || 0),
            gamesPlayed: (user.categoryPerformance[category]?.gamesPlayed || 0)
        }))
        .sort((a, b) => b.averageScore - a.averageScore);

    const insights = {
        scoresByCategory,
        categoryTrends,
        performanceOverTime: performanceOverTime.length > 0 ? performanceOverTime : [
            { date: moment().format('YYYY-MM-DD'), averageScore: 0 }
        ],
        strengthsAndWeaknesses: {
            strengths: strengthsAndWeaknesses.slice(0, 2),
            weaknesses: strengthsAndWeaknesses.slice(-2).reverse()
        }
    };

    res.status(200).json(insights);
    } catch (error) {
        console.error('Insights error:', error);
        res.status(500).json({ error: 'Error generating insights' });
    }
};

