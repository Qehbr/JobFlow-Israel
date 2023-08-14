import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';

function KeywordsGraph({ jobsData }) {
    const [keywordsData, setKeywordsData] = useState([]);

    // Process keywords data once the jobsData prop changes
    useEffect(() => {
        const keywordsDataArray = jobsData.map((doc) => ({
            python: doc.python_keyword,
            ai: doc.ai_keyword,
            java: doc.java_keyword,
            javascript: doc.javascript_keyword,
            'c++': doc['c++_keyword'],
            react: doc.react_keyword,
            sql: doc.sql_keyword,
            aws: doc.aws_keyword,
            git: doc.git_keyword,
        }));
        setKeywordsData(keywordsDataArray);
    }, [jobsData]);

    useEffect(() => {
        if (keywordsData.length > 0) {
            const canvas = document.getElementById('keywordsChart');
            const ctx = canvas.getContext('2d');

            // Process keywords data to get counts
            const keywordsCounts = {
                Python: 0,
                AI: 0,
                Java: 0,
                JavaScript: 0,
                'C++': 0,
                React: 0,
                SQL: 0,
                AWS: 0,
                Git: 0,
            };
            
            keywordsData.forEach((keywords) => {
                if (keywords.python === 1) keywordsCounts.Python++;
                if (keywords.ai === 1) keywordsCounts.AI++;
                if (keywords.java === 1) keywordsCounts.Java++;
                if (keywords.javascript === 1) keywordsCounts.JavaScript++;
                if (keywords['c++'] === 1) keywordsCounts['C++']++;
                if (keywords.react === 1) keywordsCounts.React++;
                if (keywords.sql === 1) keywordsCounts.SQL++;
                if (keywords.aws === 1) keywordsCounts.AWS++;
                if (keywords.git === 1) keywordsCounts.Git++;
            });

            // Sort keywords by count in descending order
            const sortedKeywords = Object.keys(keywordsCounts).sort((a, b) => {
                return keywordsCounts[b] - keywordsCounts[a];
            });

            // Prepare chart data
            const labels = sortedKeywords;
            const dataValues = sortedKeywords.map((keyword) => keywordsCounts[keyword]);

            // Calculate total
            const total = dataValues.reduce((acc, value) => acc + value, 0);
            
            const backgroundColors = labels.map((_, index) => {
                const shade = 200 - (index * 20); // Adjust the value to control the shade
                return `rgba(100, 50, ${shade}, 0.6)`;
            });

            // Create and render the new chart instance
            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Keywords Distribution',
                        data: dataValues,
                        backgroundColor: backgroundColors,
                        borderWidth: 1,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Frequency',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Keywords',
                            },
                        },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const value = context.parsed.y;
                                    const percentage = ((value / total) * 100).toFixed(2);
                                    return `${value} (${percentage}%)`;
                                },
                            },
                        },
                    },
                },
            });

            // Clean up function to destroy the chart instance
            return () => {
                if (newChartInstance) {
                    newChartInstance.destroy();
                }
            };
        }
    }, [keywordsData]);

    return (
        <div className="graph-section">
            <canvas id="keywordsChart" width="400" height="200"></canvas>
        </div>
    );
}

export default KeywordsGraph;
