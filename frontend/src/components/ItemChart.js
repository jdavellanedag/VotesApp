import React, { useContext, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { SocketContext } from "../context/SocketContext";
Chart.register(...registerables);

export const ItemChart = () => {
  const { socket } = useContext(SocketContext);

  useEffect(
    (myChart = Chart) => {
      socket.on("current-items", (items) => {
        if (myChart instanceof Chart) {
          myChart.destroy();
        }
        myChart = createGraph(items);
      });
      return () => socket.off("current-items");
    },
    [socket]
  );

  const createGraph = (items = []) => {
    const ctx = document.getElementById("myChart");
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: items.map((item) => item.name),
        datasets: [
          {
            label: "# of Votes",
            data: items.map((item) => item.votes),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: "y",
        beginAtZero: true,
      },
    });
  };

  return <canvas id="myChart"></canvas>;
};
