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
import useExpenseLineChart from "../../hooks/useExpenseLineChart";
import "./expense-line-chart-styles.css";
import "../styles.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ExpenseLineChart = () => {
  const { theme } = useTheme();
  const { chartData, options } = useExpenseLineChart();
  const hasData = chartData.datasets.some((dataset) => dataset.data.length > 0);

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column expense-summary-section ${theme}`}
      aria-labelledby="expense-trend-title"
    >
      <h5 id="expense-trend-title">Expense Trend</h5>

      <div
        className="flex-grow-1"
        role="img"
        aria-label="Line chart displaying expense trends over time"
        tabIndex="0"
      >
        {hasData ? (
          <Line
            data={chartData}
            options={{
              ...options,
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    color: theme === "dark" ? "#ffffff" : "#000000",
                    font: { size: 14 },
                  },
                },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: function (tooltipItem) {
                      return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
                    },
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
            role="presentation"
            aria-hidden="true"
          />
        ) : (
          <p
            className="text-muted"
            aria-live="polite"
            aria-label="No expense data available to display"
          >
            No data available.
          </p>
        )}
      </div>
    </section>
  );
};

export default ExpenseLineChart;
