import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import '../styles/Graph.css'; 

const locationOptions = [
    { label: 'District', key: 'district' },
    { label: 'Location', key: 'location' },
];

function LocationGraph({ jobsData }) {
    const [selectedLocation, setSelectedLocation] = useState(locationOptions[0].key);
    const [locationData, setLocationData] = useState([]);

    // Process location data once the jobsData or selectedLocation prop changes
    useEffect(() => {
        const locationDataArray = jobsData.map((doc) => ({
            locationType: selectedLocation,
            location: doc[selectedLocation],
        }));
        setLocationData(locationDataArray);
    }, [jobsData, selectedLocation]);

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    useEffect(() => {
        if (locationData.length > 0) {
            const canvas = document.getElementById('locationChart');
            const ctx = canvas.getContext('2d');

            // Process location data to get counts
            const locationCounts = {};
            locationData.forEach((data) => {
                const location = data.location || 'Unknown';
                locationCounts[location] = (locationCounts[location] || 0) + 1;
            });

            // Prepare chart data
            const labels = Object.keys(locationCounts);
            const dataValues = Object.values(locationCounts);

            // Create and render the new chart instance
            const newChartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Location Distribution',
                            data: dataValues,
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
                                text: 'Location',
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
    }, [locationData]);

    return (
        <div className="graph-section">
            <div className='inline-container'>
                <h3>Select Location Type:</h3>
                <select value={selectedLocation} onChange={handleLocationChange}>
                    {locationOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <canvas id="locationChart" width="400" height="200"></canvas>
        </div>
    );
}

export default LocationGraph;
