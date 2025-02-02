import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

const useExpenseList = () => {
  const { expenseList, categories, updateExpense } = useExpenses();

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "none" });
  const [filterCategory, setFilterCategory] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState(null);

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
    let direction = "ascending";
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "ascending" ? "descending" : "none";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleEditStart = (index, key, value) => {
    setEditing({ index, key });
    setEditValue(value);
    setError(null);
  };

  const handleEditConfirm = (index, key, value = null) => {
    const finalValue = value || editValue;
    if (key === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(finalValue)) {
      setError("Date must be in YYYY-MM-DD format.");
      return;
    }

    if (key === "name") {
      if (!finalValue.trim()) {
        setError("Name cannot be empty.");
        return;
      }
      if (!/[a-zA-Z]/.test(finalValue)) {
        setError("Name must contain at least one alphabetic character.");
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
        setError("Please enter a valid positive number.");
        return;
      }
    }

    const updatedExpense = {
      ...filteredExpenses[index],
      [key]: key === "amount" ? parseFloat(finalValue) : finalValue,
    };

    updateExpense(updatedExpense.id, updatedExpense);
    setEditing(null);
    setEditValue("");
    setError(null);
  };

  const handleKeyPress = (e, index, key) => {
    if (e.key === "Enter") handleEditConfirm(index, key);
    else if (e.key === "Escape") {
      setEditing(null);
      setEditValue("");
      setError(null);
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
    handleSort,
    handleFilterChange,
    handleEditStart,
    handleEditConfirm,
    handleKeyPress,
  };
};

export default useExpenseList;
