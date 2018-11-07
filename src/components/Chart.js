import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./css/chart.css";
const Chart = ({ events }) => {
  const tally = events.reduce((acc, val, i) => {
    if (acc[val.genre] === undefined) acc[val.genre] = 1;
    else acc[val.genre]++;
    return acc;
  }, {});

  const categoryProperties = Object.keys(tally);
  const categoryValues = Object.values(tally);

  const data = {
    labels: categoryProperties,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };
  return (
    <div>
      <h2 className="doughnut">Doughnut Example</h2>
      <Doughnut width={1000} height={250} data={data} />
    </div>
  );
};

export default Chart;
