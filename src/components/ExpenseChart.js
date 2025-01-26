import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { backgroundColor, hoverBackgroundColor } from "../constants/constants";
import { useTheme } from "../context/ThemeContext";
import "./styles.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseSummaryChart({ data }) {
  const { theme } = useTheme();
  const expenseData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
          color: theme === "light" ? "#333" : "#fff",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return ` ${value} (${(
              (value / Object.values(data).reduce((a, b) => a + b, 0)) *
              100
            ).toFixed(2)}%)`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <section
      className="p-3 border rounded bg-light"
      aria-labelledby="expense-summary-title"
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#444",
        color: theme === "light" ? "#000" : "#fff",
        border: `1px solid ${theme === "light" ? "#ccc" : "#666"}`,
      }}
    >
      <h5
        id="expense-summary-title"
        style={{
          backgroundColor: theme === "light" ? "#fff" : "#444",
          color: theme === "light" ? "#000" : "#fff",
          borderColor: theme === "light" ? "#ccc" : "#666",
        }}
      >
        Expense Summary
      </h5>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "300px",
          backgroundColor: theme === "light" ? "#fff" : "#444",
          color: theme === "light" ? "#000" : "#fff",
          borderColor: theme === "light" ? "#ccc" : "#666",
        }}
      >
        <Pie
          data={expenseData}
          options={options}
          role="img"
          aria-label="Pie chart showing expense distribution by category"
        />
      </div>
    </section>
  );
}

export default ExpenseSummaryChart;
