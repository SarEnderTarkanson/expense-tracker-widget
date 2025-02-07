import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useExpensePieChart from "../../hooks/useExpensePieChart";
import { useTheme } from "../../context/ThemeContext";
import "./expense-pie-chart-styles.css";
import "../styles.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
  const { theme } = useTheme();
  const { expenseData, options, hasData, customLegend, error, clearError } =
    useExpensePieChart();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column expense-summary-section ${theme}`}
      aria-labelledby="expense-summary-title"
    >
      <h4
        id="expense-summary-title"
        className={`expense-summary-title ${theme}`}
      >
        <i className="bi bi-pie-chart-fill expense-summary-icon"></i> Expense
        Summary
      </h4>

      {error && (
        <div className="alert alert-danger fade show" role="alert">
          {error}
        </div>
      )}

      {!hasData ? (
        <div
          className={`d-flex justify-content-center align-items-center themed-container ${theme}`}
          role="img"
          aria-label="Pie chart displaying expense distribution by category"
          tabIndex="0"
        >
          <p className={`no-data-container ${theme}`} aria-live="polite">
            No data available yet.
          </p>
        </div>
      ) : (
        <>
          <div
            className={`d-flex justify-content-center align-items-center themed-container ${theme}`}
            role="img"
            aria-label="Pie chart displaying expense distribution by category"
            tabIndex="0"
          >
            <Pie
              data={expenseData}
              options={options}
              role="presentation"
              aria-hidden="true"
            />
          </div>

          {customLegend}
        </>
      )}
    </section>
  );
};

export default ExpensePieChart;
