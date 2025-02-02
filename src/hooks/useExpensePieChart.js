import { useMemo } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { useTheme } from "../context/ThemeContext";

const useExpensePieChart = () => {
  const { expenseList, categories, categoryColors } = useExpenses();
  const { theme } = useTheme();

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

  const expenseData = useMemo(() => {
    return {
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
  }, [categoryData, categoryColors]);

  const options = useMemo(() => {
    return {
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
  }, [theme, categoryData]);

  return { expenseData, options, categoryData };
};

export default useExpensePieChart;
