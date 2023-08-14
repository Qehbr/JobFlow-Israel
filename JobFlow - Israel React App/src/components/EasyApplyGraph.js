import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';

function EasyApplyGraph({ jobsData }) {
    const [easyApplyData, setEasyApplyData] = useState([]);

    // Process easy apply data once the jobsData prop changes
    useEffect(() => {
        const easyApplyDataArray = [];
        jobsData.forEach((doc) => {
            easyApplyDataArray.push(doc.easy_apply);
        });
        setEasyApplyData(easyApplyDataArray);
    }, [jobsData]);

    useEffect(() => {
        if (easyApplyData.length > 0) {
            const canvas = document.getElementById('easyApplyChart');
            const ctx = canvas.getContext('2d');

            // Process easy apply data to get counts
            const easyApplyCounts = {
                0: 0, // Non-Easy Apply
                1: 0, // Easy Apply
            };
            easyApplyData.forEach((easyApply) => {
                easyApplyCounts[easyApply] = (easyApplyCounts[easyApply] || 0) + 1;
            });

            // Calculate total
            const total = easyApplyData.length;

            // Prepare chart data
            const labels = [ 'Easy Apply', 'Non-Easy Apply'];
            const dataValues = [easyApplyCounts[1], easyApplyCounts[0]];

            // Create and render the new chart instance
            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Easy Apply Distribution',
                        data: dataValues,
                        borderWidth: 1,
                        backgroundColor: ['rgba(0, 51, 102, 0.6)', 'rgba(204, 51, 0, 0.6)', ]
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
                                text: 'Easy Apply Status',
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
    }, [easyApplyData]);

    return (
        <div className="graph-section">
            <canvas id="easyApplyChart" width="400" height="200"></canvas>
        </div>
    );
}

export default EasyApplyGraph;
