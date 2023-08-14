import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import '../styles/Graph.css'; 

const companyInfoOptions = [
    { label: 'Rating', key: 'rating' },
    { label: 'Type', key: 'company_type' },
    { label: 'Section', key: 'company_sector' },
    { label: 'Industry', key: 'company_industry' },
    { label: 'Revenue', key: 'company_revenue' },
    { label: 'Age', key: 'age' },
];

const revenueOrder = [
    'Less than $1 million (USD)',
    '$1 to $5 million (USD)',
    '$5 to $25 million (USD)',
    '$25 to $100 million (USD)',
    '$100 to $500 million (USD)',
    '$500 million to $1 billion (USD)',
    '$1 to $5 billion (USD)',
    '$5 to $10 billion (USD)',
    '$10+ billion (USD)',
];

function CompanyInfoGraph({ jobsData }) {
    const [selectedCompanyInfo, setSelectedCompanyInfo] = useState(companyInfoOptions[0].key);
    const [companyInfoData, setCompanyInfoData] = useState([]);

    useEffect(() => {
        const uniqueCompanies = new Set();
        const companyInfoDataArray = jobsData.map((doc) => {
            const companyInfo = doc[selectedCompanyInfo];
            if (!uniqueCompanies.has(doc.employer)) {
                uniqueCompanies.add(doc.employer);
                return {
                    companyInfoType: selectedCompanyInfo,
                    companyInfo: companyInfo,
                };
            }
            return null;
        }).filter((data) => data !== null);

        setCompanyInfoData(companyInfoDataArray);
    }, [jobsData, selectedCompanyInfo]);

    const handleCompanyInfoChange = (event) => {
        setSelectedCompanyInfo(event.target.value);
    };

    useEffect(() => {
        if (companyInfoData.length > 0) {
            const canvas = document.getElementById('companyInfoChart');
            const ctx = canvas.getContext('2d');

            // Process company info data to get counts
            let companyInfoCounts = {};
            companyInfoData.forEach((data) => {
                const companyInfo = data.companyInfo || 'Unknown';

                if (data.companyInfoType === 'company_revenue') {
                    companyInfoCounts[companyInfo] = (companyInfoCounts[companyInfo] || 0) + 1;
                } else if (data.companyInfoType === 'age' && data.companyInfo !== -1) {
                    companyInfoCounts[companyInfo] = (companyInfoCounts[companyInfo] || 0) + 1;
                }
                else if (data.companyInfoType === 'rating' && data.companyInfo !== -1) {
                    companyInfoCounts[companyInfo] = (companyInfoCounts[companyInfo] || 0) + 1;
                }
                else if (data.companyInfoType !== 'age'&& data.companyInfoType !== 'rating' && data.companyInfoType !== 'company_revenue') {
                    companyInfoCounts[companyInfo] = (companyInfoCounts[companyInfo] || 0) + 1;
                }
            });

            // Sort the data by counts for selected types
            if (selectedCompanyInfo !== 'company_revenue' && selectedCompanyInfo !== 'rating' && selectedCompanyInfo !== 'age') {
                const sortedCounts = Object.entries(companyInfoCounts)
                    .sort((a, b) => b[1] - a[1])
                    .reduce((acc, [key, value]) => {
                        acc[key] = value;
                        return acc;
                    }, {});
                companyInfoCounts = sortedCounts;
            }

            // Calculate total
            const total = Object.values(companyInfoCounts).reduce((acc, value) => acc + value, 0);

            // Prepare chart data
            let labels = Object.keys(companyInfoCounts);
            let dataValues = Object.values(companyInfoCounts);
            

            if (selectedCompanyInfo === 'company_revenue') {
                // Sort revenue labels according to revenueOrder
                labels = revenueOrder.filter(revenue => companyInfoCounts[revenue] !== undefined);
                // Map sorted revenue labels to their corresponding data values
                dataValues = labels.map(revenue => companyInfoCounts[revenue]);
            }

            const backgroundColors = labels.map(() => {
                const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
                return randomColor;
            });

            // Create and render the new chart instance
            const newChartInstance = new Chart(ctx, {
                type: selectedCompanyInfo === 'age' ? 'line' : 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Company Info Distribution',
                            data: dataValues,
                            backgroundColor: backgroundColors,
                            borderWidth: 1,
                        },
                    ],
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
                                text: 'Company Info',
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
    }, [companyInfoData, selectedCompanyInfo]);

    return (
        <div className="graph-section">
            <div className='inline-container'>
                <h3>Select Company Info Type:</h3>
                <select value={selectedCompanyInfo} onChange={handleCompanyInfoChange}>
                    {companyInfoOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <canvas id="companyInfoChart" width="400" height="200"></canvas>
        </div>
    );
}

export default CompanyInfoGraph;
