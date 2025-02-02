import { useMemo } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { useTheme } from "../context/ThemeContext";

const useExpenseLineChart = () => {
  const { expenseList } = useExpenses();
  const { theme } = useTheme();

  const aggregatedData = useMemo(() => {
    return expenseList.reduce((acc, item) => {
      if (acc[item.date]) {
        acc[item.date] += item.amount;
      } else {
        acc[item.date] = item.amount;
      }
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

  const options = useMemo(() => {
    return {
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
            text: "Amount (NOK)",
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
  }, [theme]);

  return { chartData, options };
};

export default useExpenseLineChart;
