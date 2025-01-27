import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../../context/ThemeContext";
import './expense-line-chart-styles.css'
import "../styles.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ExpenseLineChart = ({ data }) => {
  const { theme } = useTheme();

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Expenses",
        data: data.map((item) => item.amount),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointBackgroundColor: "#4caf50",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme === "light" ? "#333" : "#fff",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Amount: $${context.raw}`,
        },
        titleColor: theme === "light" ? "#333" : "#fff",
        bodyColor: theme === "light" ? "#333" : "#fff",
        backgroundColor: theme === "light" ? "#fff" : "#333",
        borderColor: theme === "light" ? "#ccc" : "#666",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          color: theme === "light" ? "#333" : "#fff",
        },
        ticks: {
          color: theme === "light" ? "#333" : "#fff",
        },
        grid: {
          color: theme === "light" ? "#e0e0e0" : "#555",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount ($)",
          color: theme === "light" ? "#333" : "#fff",
        },
        ticks: {
          color: theme === "light" ? "#333" : "#fff",
        },
        grid: {
          color: theme === "light" ? "#e0e0e0" : "#555",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column expense-summary-section ${theme}`}
    >
      <h5>Expense Trend</h5>
      <div className="flex-grow-1">
        <Line data={chartData} options={options} />
      </div>
    </section>
  );
};

export default ExpenseLineChart;
