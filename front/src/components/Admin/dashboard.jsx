import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";

const MultiAxisLine = ({ metricas }) => {
  const labels = (obj) => {
    let y1 = [];
    let x = [];
    let y2 = [];
    let y3 = [];
    let y4 = [];

    for (const id in obj) {
      x.push(obj[id].name);
      y1.push(obj[id].deliver);
      y2.push(obj[id].returned);
      y3.push(obj[id].averageTimeDeli / 3600000);
      y4.push(obj[id].averageTimePick / 3600000);
    }

    return { y1, x, y2, y3, y4 };
  };

  const data = {
    labels: labels(metricas).x,
    datasets: [
      {
        label: "Promedio tiempo de entrega",
        data: labels(metricas).y3,

        backgroundColor: "#ffb3b3",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Promedio de espera",
        data: labels(metricas).y4,

        backgroundColor: "#ff0000",
        borderColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Horas",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <>{metricas && <Bar data={data} options={options} />}</>;
};

export default MultiAxisLine;
