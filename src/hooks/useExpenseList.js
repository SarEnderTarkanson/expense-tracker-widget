import { useState, useEffect } from "react";
import { useExpenses } from "../context/ExpenseContext";

const useExpenseList = () => {
  const { expenseList, categories, updateExpense, error, clearError } =
    useExpenses();

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "none",
  });
  const [filterCategory, setFilterCategory] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const sortedExpenses = [...expenseList].sort((a, b) => {
    if (sortConfig.direction === "none") return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredExpenses = filterCategory
    ? sortedExpenses.filter((expense) => expense.category === filterCategory)
    : sortedExpenses;

  const handleSort = (key) => {
    setSortConfig((prevSort) => {
      let newDirection;

      if (prevSort.key === key) {
        newDirection =
          prevSort.direction === "ascending"
            ? "descending"
            : prevSort.direction === "descending"
            ? "none"
            : "ascending";
      } else {
        newDirection = "ascending";
      }

      return {
        key: newDirection === "none" ? null : key,
        direction: newDirection,
      };
    });
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleEditStart = (index, key, value) => {
    setEditing({ index, key });
    setEditValue(value);
    setLocalError(null);
  };

  const handleEditConfirm = async (index, key, value = null) => {
    const finalValue = value || editValue;

    if (key === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(finalValue)) {
      setLocalError("Date must be in YYYY-MM-DD format.");
      return;
    }

    if (key === "name") {
      if (!finalValue.trim()) {
        setLocalError("Name cannot be empty.");
        return;
      }
      if (!/[a-zA-Z]/.test(finalValue)) {
        setLocalError("Name must contain at least one alphabetic character.");
        return;
      }
    }

    if (key === "amount") {
      const trimmedValue = finalValue.trim();
      if (
        trimmedValue === "" ||
        !/^\d+(\.\d+)?$/.test(trimmedValue) ||
        Number(trimmedValue) <= 0
      ) {
        setLocalError("Please enter a valid positive number.");
        return;
      }
    }

    const updatedExpense = {
      ...filteredExpenses[index],
      [key]: key === "amount" ? parseFloat(finalValue) : finalValue,
    };

    try {
      await updateExpense(updatedExpense.id, updatedExpense);
      setEditing(null);
      setEditValue("");
      setLocalError(null);
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  const handleKeyPress = (e, index, key) => {
    if (e.key === "Enter") handleEditConfirm(index, key);
    else if (e.key === "Escape") {
      setEditing(null);
      setEditValue("");
      setLocalError(null);
    }
  };

  return {
    sortedExpenses: filteredExpenses,
    categories,
    sortConfig,
    filterCategory,
    editing,
    editValue,
    error,
    localError,
    handleSort,
    handleFilterChange,
    handleEditStart,
    handleEditConfirm,
    handleKeyPress,
    clearError,
  };
};

export default useExpenseList;
