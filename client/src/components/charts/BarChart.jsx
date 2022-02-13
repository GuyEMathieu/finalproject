import React from 'react';
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale, Legend, Tooltip } from 'chart.js';
import {Bar} from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    LinearScale,
    CategoryScale,
    Legend,
    Tooltip
);

const options = {
    maintainAspectRation: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    legend: {
        labels: {
            fontSize: 26
        }
    }
}

const BarChart = ({data}) => {
    return <Bar data={data} options={options} height={200}/> 
}

export default BarChart;

