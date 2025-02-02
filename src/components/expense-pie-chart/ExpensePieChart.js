import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useExpensePieChart from "../../hooks/useExpensePieChart";
import { useTheme } from "../../context/ThemeContext";
import "./expense-pie-chart-styles.css";
import "../styles.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
  const { theme } = useTheme();
  const { expenseData, options, categoryData } = useExpensePieChart();

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column expense-summary-section ${theme}`}
      aria-labelledby="expense-summary-title"
    >
      <h5 id="expense-summary-title">Expense Summary</h5>

      <div
        className={`d-flex justify-content-center align-items-center themed-container ${theme}`}
        role="img"
        aria-label="Pie chart displaying expense distribution by category"
        tabIndex="0"
      >
        {Object.keys(categoryData).length > 0 ? (
          <Pie
            data={expenseData}
            options={{
              ...options,
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    color: theme === "dark" ? "#ffffff" : "#000000",
                    font: {
                      size: 14,
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: function (tooltipItem) {
                      let dataset = tooltipItem.dataset;
                      let dataIndex = tooltipItem.dataIndex;
                      let value = dataset.data[dataIndex];
                      let label = dataset.label[dataIndex];
                      return `${label}: ${value}%`;
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
            aria-label="No expenses or categories available"
          >
            No expenses or categories to display.
          </p>
        )}
      </div>
    </section>
  );
};

export default ExpensePieChart;
