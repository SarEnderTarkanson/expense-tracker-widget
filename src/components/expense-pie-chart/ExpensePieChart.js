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
};

export default ExpensePieChart;
