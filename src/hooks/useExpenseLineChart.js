import { useMemo } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { useTheme } from "../context/ThemeContext";

const useExpenseLineChart = () => {
  const { expenseList } = useExpenses();
  const { theme } = useTheme();

  const aggregatedData = useMemo(() => {
    return expenseList.reduce((acc, item) => {
      acc[item.date] = (acc[item.date] || 0) + item.amount;
      return acc;
    }, {});
  }, [expenseList]);

  const sortedDates = useMemo(() => {
    return Object.keys(aggregatedData).sort(
      (a, b) => new Date(a) - new Date(b)
    );
  }, [aggregatedData]);

  const chartData = useMemo(() => {
    return {
      labels: sortedDates,
      datasets: [
        {
          label: "Expenses",
          data: sortedDates.map((date) => aggregatedData[date]),
          borderColor: "#4caf50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          pointBackgroundColor: "#4caf50",
          tension: 0.4,
        },
      ],
    };
  }, [aggregatedData, sortedDates]);

  const customLegend = useMemo(() => {
    if (!chartData.datasets.length) return null;

    return (
      <ul className={`custom-legend ${theme}`}>
        {chartData.datasets.map((dataset, index) => (
          <li key={index}>
            <span
              className="legend-color"
              style={{ backgroundColor: dataset.borderColor }}
            ></span>
            {dataset.label}
          </li>
        ))}
      </ul>
    );
  }, [chartData, theme]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => `Amount: ${context.raw} NOK`,
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
          ticks: { color: theme === "light" ? "#333" : "#fff" },
          grid: { color: theme === "light" ? "#e0e0e0" : "#555" },
        },
        y: {
          title: {
            display: true,
            text: "Amount (NOK)",
            color: theme === "light" ? "#333" : "#fff",
          },
          ticks: { color: theme === "light" ? "#333" : "#fff" },
          grid: { color: theme === "light" ? "#e0e0e0" : "#555" },
          beginAtZero: true,
        },
      },
    };
  }, [theme]);

  return { chartData, options, customLegend };
};

export default useExpenseLineChart;
