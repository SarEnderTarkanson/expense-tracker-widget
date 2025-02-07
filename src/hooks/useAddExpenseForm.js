import { useState, useEffect } from "react";
import { useExpenses } from "../context/ExpenseContext";

const useAddExpenseForm = () => {
  const {
    categories,
    fetchCategories,
    loading,
    addExpense,
    error,
    clearError,
  } = useExpenses();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState(null);
  const [warnings, setWarnings] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  useEffect(() => {
    if (error) {
      setAlert({ type: "danger", message: error });
    }
  }, [error]);

  const validateDate = (value) => value.trim() !== "";

  const validateName = (value) =>
    /[a-zA-Z]/.test(value) && !/^\d+(\.\d+)?$/.test(value);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setWarnings((prev) => ({
      ...prev,
      name: validateName(value)
        ? ""
        : "Expense name must include letters and cannot be just a number.",
    }));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.trim();
    setAmount(value);
    setWarnings((prev) => ({
      ...prev,
      amount:
        value === "" || isNaN(value) || Number(value) <= 0
          ? "Please enter a valid positive number."
          : "",
    }));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setWarnings((prev) => ({
      ...prev,
      category: e.target.value ? "" : "Please select a category.",
    }));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setWarnings((prev) => ({
      ...prev,
      date: validateDate(e.target.value) ? "" : "Please select a valid date.",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWarnings = {
      name: name.trim() === "" ? "Please enter a name." : warnings.name,
      amount:
        !amount || Number(amount) <= 0 ? "Please enter a positive amount." : "",
      category: category === "" ? "Please select a category." : "",
      date: validateDate(date) ? "" : "Please select a valid date.",
    };

    setWarnings(newWarnings);

    if (Object.values(newWarnings).some((warning) => warning !== "")) {
      setAlert({
        type: "danger",
        message: "Please fix the errors before submitting.",
      });
      return;
    }

    const newExpense = {
      name,
      amount: parseFloat(amount),
      category,
      date,
    };

    try {
      await addExpense(newExpense);
      setName("");
      setAmount("");
      setCategory("");
      setDate("");
      setAlert({ type: "success", message: "Expense added successfully!" });
    } catch (err) {
      setAlert({
        type: "danger",
        message: "Error adding expense. Please try again.",
      });
    }
  };

  const clearAlert = () => {
    setAlert(null);
    clearError();
  };

  return {
    name,
    amount,
    category,
    date,
    alert,
    warnings,
    loading,
    categories,
    handleNameChange,
    handleAmountChange,
    handleCategoryChange,
    handleDateChange,
    handleSubmit,
    clearAlert,
  };
};

export default useAddExpenseForm;
