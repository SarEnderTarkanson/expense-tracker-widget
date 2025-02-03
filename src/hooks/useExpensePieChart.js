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

    return totals;
  }, [expenseList, categories]);

  const hasData = useMemo(
    () => Object.values(categoryData).some((value) => value > 0),
    [categoryData]
  );

  const expenseData = useMemo(() => {
    if (!hasData) {
      return null;
    }

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
  }, [categoryData, categoryColors, hasData]);

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
              const value = tooltipItem.raw;
              const total = Object.values(categoryData).reduce(
                (a, b) => a + b,
                0
              );
              return `${value} NOK (${
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
  console.log(expenseData)
  return { expenseData, options, hasData };
};

export default useExpensePieChart;
