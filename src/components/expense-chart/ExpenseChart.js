import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "../../context/ThemeContext";
import { useExpenses } from "../../context/ExpenseContext";
import "./expense-chart-styles.css";
import "../styles.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseSummaryChart() {
  const { theme } = useTheme();
  const { expenseList, categories, categoryColors } = useExpenses();

  const categoryData = useMemo(() => {
    const totals = {};

    categories.forEach((category) => {
      totals[category.name] = 0;
    });

    expenseList.forEach((expense) => {
      if (totals[expense.category] !== undefined) {
        totals[expense.category] += expense.amount;
      }
    });

    Object.keys(totals).forEach((key) => {
      if (totals[key] === 0) {
        totals[key] = 0.001;
      }
    });

    return totals;
  }, [expenseList, categories]);

  const expenseData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: Object.keys(categoryData).map(
          (category) => categoryColors[category] || "gray"
        ),
        hoverBackgroundColor: Object.keys(categoryData).map(
          (category) =>
            `${categoryColors[category]?.slice(0, -1)}, 0.8)` || "darkgray"
        ),
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
            const value = tooltipItem.raw === 0.001 ? 0 : tooltipItem.raw;
            const total = Object.values(categoryData).reduce(
              (a, b) => (b === 0.001 ? a : a + b),
              0
            );
            return ` ${value} (${
              total > 0 ? ((value / total) * 100).toFixed(2) : "0.00"
            }%)`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column expense-summary-section ${theme}`}
      aria-labelledby="expense-summary-title"
    >
      <h5 id="expense-summary-title">Expense Summary</h5>
      <div
        className={`d-flex justify-content-center align-items-center themed-container ${theme}`}
      >
        {Object.keys(categoryData).length > 0 ? (
          <Pie
            data={expenseData}
            options={options}
            role="pie chart"
            aria-label="Pie chart showing expense distribution by category"
          />
        ) : (
          <p className="text-muted">No expenses or categories to display.</p>
        )}
      </div>
    </section>
  );
}

export default ExpenseSummaryChart;
