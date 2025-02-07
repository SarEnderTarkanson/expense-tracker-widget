import React, { useEffect } from "react";
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
  const { chartData, options, customLegend, error, clearError } =
    useExpenseLineChart();
  const hasData = chartData.datasets.some((dataset) => dataset.data.length > 0);

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
      aria-labelledby="expense-trend-title"
    >
      <h4 id="expense-trend-title" className={`expense-trend-title ${theme}`}>
        <i className="bi bi-graph-up expense-trend-icon"></i> Expense Trend
      </h4>
      {error && (
        <div className="alert alert-danger fade show" role="alert">
          {error}
          
        </div>
      )}

      <div className="chart-container">
        {hasData ? (
          <Line
            data={chartData}
            options={options}
            role="presentation"
            aria-hidden="true"
          />
        ) : (
          <p className={`no-data-container ${theme}`} aria-live="polite">
            No data available yet.
          </p>
        )}
      </div>

      {hasData && customLegend}
    </section>
  );
};

export default ExpenseLineChart;
