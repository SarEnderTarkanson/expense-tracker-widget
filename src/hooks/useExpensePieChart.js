import { useMemo, useEffect } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { useTheme } from "../context/ThemeContext";

const useExpensePieChart = () => {
  const { expenseList, categories, categoryColors, error, clearError } =
    useExpenses();
  const { theme } = useTheme();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const categoryData = useMemo(() => {
    if (error) return {};

    const totals = categories.reduce((acc, category) => {
      acc[category.name] = 0;
      return acc;
    }, {});

    expenseList.forEach((expense) => {
      if (totals[expense.category] !== undefined) {
        totals[expense.category] += expense.amount;
      }
    });

    return totals;
  }, [expenseList, categories, error]);

  const hasData = useMemo(
    () => Object.values(categoryData).some((value) => value > 0),
    [categoryData]
  );

  const expenseData = useMemo(() => {
    if (!hasData || error) return null;

    const labels = Object.keys(categoryData);
    const dataValues = Object.values(categoryData);

    return {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: labels.map(
            (category) => categoryColors[category] || "gray"
          ),
          hoverBackgroundColor: labels.map(
            (category) =>
              `${categoryColors[category]?.slice(0, -1)}, 0.8)` || "darkgray"
          ),
          borderWidth: 2,
          borderColor: theme === "light" ? "#fff" : "#222",
        },
      ],
    };
  }, [categoryData, categoryColors, hasData, theme, error]);

  const customLegend = useMemo(() => {
    if (!hasData || !expenseData || error) return null;

    return (
      <ul className={`custom-legend ${theme}`}>
        {expenseData.labels.map((label, index) => (
          <li key={index}>
            <span
              className="legend-color"
              style={{
                backgroundColor: expenseData.datasets[0].backgroundColor[index],
              }}
            ></span>
            {label}
          </li>
        ))}
      </ul>
    );
  }, [expenseData, hasData, theme, error]);

  const options = useMemo(() => {
    return {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (tooltipItem) => {
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
  }, [categoryData]);

  return { expenseData, options, hasData, customLegend, error, clearError };
};

export default useExpensePieChart;
