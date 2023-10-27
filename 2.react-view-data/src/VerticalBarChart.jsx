import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VerticalBarChart = ({ data }) => {
  const years = data.map(entry => entry.Year);

  const fuelLabels = ['Solid Fuel', 'Gas Fuel', 'Liquid Fuel', 'Gas Flaring'];

  const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  const datasets = fuelLabels.map((label, index) => ({
    label: label,
    data: data.map(entry => entry[label]),
    backgroundColor: backgroundColors[index],
    barThickness: 1, // Ajusta el valor según sea necesario
  }));

  const chartData = {
    labels: years,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Vertical Bar Chart',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};

export default VerticalBarChart;
