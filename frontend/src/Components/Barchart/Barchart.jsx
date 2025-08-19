import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Barchart = ({lables,datas}) => {
  const data = {
    labels: lables,
    datasets: [
      {
        label: "Energy",
        data: datas,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Energy use per city" },
    },
  };
  return <Bar data={data} options={options} />;
};

export default Barchart;
