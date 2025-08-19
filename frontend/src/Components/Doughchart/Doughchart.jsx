import React, { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
// chartConfig.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement, // 👈 needed for donut/pie
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const Doughchart = ({lable,datas}) => {
  const data = {
    labels: lable,
    datasets: [
      {
        label: "Price",
        data: datas,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
      },
    ],

  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Price distribution",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default Doughchart;
