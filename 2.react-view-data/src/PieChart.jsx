// En tu componente PieChart.js
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const fuelLabels = ['Solid Fuel', 'Gas Fuel', 'Liquid Fuel', 'Gas Flaring'];
  const fuelData = fuelLabels.map(label => data.reduce((acc, entry) => acc + entry[label], 0));
  const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56'];

  const dataset = {
    labels: fuelLabels,
    datasets: [
      {
        data: fuelData,
        backgroundColor: backgroundColors,
      },
    ],
  };

  return <Pie data={dataset} />;
};

export default PieChart;
