import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineChart = ({ data }) => {
  const years = data.map(entry => entry.Year);

  const totalData = data.map(entry => entry.Total);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Total General',
        data: totalData,
        fill: false,
        borderColor: '#FF6384',
        borderWidth: 2,
        pointBackgroundColor: '#FF6384',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart - Total General por Año',
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default LineChart;
