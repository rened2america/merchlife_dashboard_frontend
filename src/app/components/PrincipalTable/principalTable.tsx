"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Sales",
      data: [0, 0, 0, 0, 0],
      borderColor: "rgb(195 183 67)",
      backgroundColor: "rgb(255 242 122)",
    },
  ],
};

export const PrincipalTable = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "100px 1fr",
        marginTop: "40px",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: "700",
        }}
      >
        Total sales from last month
      </div>
      <Line
        style={{
          width: "80%",
        }}
        options={options}
        data={data}
      />
    </div>
  );
};
