import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';

function JobTitlesGraph({ jobsData }) {
    const [jobTitlesData, setJobTitlesData] = useState([]);

    // Process job titles data once the jobsData prop changes
    useEffect(() => {
        const jobTitlesDataArray = [];
        jobsData.forEach((doc) => {
            jobTitlesDataArray.push(doc.title);
        });
        setJobTitlesData(jobTitlesDataArray);
    }, [jobsData]);

    useEffect(() => {
        if (jobTitlesData.length > 0) {
            const canvas = document.getElementById('jobTitlesChart');
            const ctx = canvas.getContext('2d');

            // Process job titles data to get counts
            const jobTitlesCounts = {};
            jobTitlesData.forEach((title) => {
                jobTitlesCounts[title] = (jobTitlesCounts[title] || 0) + 1;
            });

            // Sort job titles by count in descending order
            const sortedJobTitles = Object.keys(jobTitlesCounts).sort((a, b) => {
                return jobTitlesCounts[b] - jobTitlesCounts[a];
            });

            // Prepare chart data
            const labels = sortedJobTitles;
            const dataValues = sortedJobTitles.map((title) => jobTitlesCounts[title]);

            // Calculate total
            const total = dataValues.reduce((acc, value) => acc + value, 0);
            
            const backgroundColors = labels.map((_, index) => {
                const shade = 200 - (index * 20); // Adjust the value to control the shade
                return `rgba(100, 162, ${shade}, 0.6)`;
            });

            // Create and render the new chart instance
            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Job Titles Distribution',
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
                                text: 'Job Titles',
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
    }, [jobTitlesData]);

    return (
        <div className="graph-section">
            <canvas id="jobTitlesChart" width="400" height="200"></canvas>
        </div>
    );
}

export default JobTitlesGraph;
