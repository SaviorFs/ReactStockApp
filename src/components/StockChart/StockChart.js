import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register the components used in the chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

const StockChart = ({ historicalData }) => {
    // Check if data is available
    if (!historicalData || historicalData.length === 0) return <p>No chart data available</p>;

    // Prepare the data for the chart
    const chartData = {
        labels: historicalData.map(data => data.date),
        datasets: [
            {
                label: 'Stock Price',
                data: historicalData.map(data => data.close),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            }
        ]
    };

    // Options for the chart
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Stock Price History'
            },
            legend: {
                display: true, // Show legend
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            },
            y: {
                beginAtZero: true
            }
        },
        elements: {
            point: {
                pointStyle: false
            }
        },
        maintainAspectRatio: true, // Maintain aspect ratio
        responsive: true, // Make the chart responsive
    };

    // Render the line chart
    return (
        <div className="lightbox-container bg-white border rounded shadow p-4 m-4">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Stock Price History</h1>
                </div>
            </header>
            <div className="chart-container p-4 bg-white border shadow-md rounded-lg my-4 mx-4">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default StockChart;
