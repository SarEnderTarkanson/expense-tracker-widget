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
