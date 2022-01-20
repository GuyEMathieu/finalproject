import React from 'react';
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale } from 'chart.js';
import {Bar} from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    LinearScale,
    CategoryScale
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

    return <Bar  data={data} options={options}/> 
}

export default BarChart;

