import { useState, useEffect } from "react";
import { useExpenses } from "../context/ExpenseContext";

const useAddExpenseForm = () => {
  const { categories, fetchCategories, loading, addExpense } = useExpenses();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [alert, setAlert] = useState(null);
  const [warnings, setWarnings] = useState({
    name: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  const validateName = (value) => {
    return /[a-zA-Z]/.test(value) && !/^\d+(\.\d+)?$/.test(value);
  };

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
        value === "" || !/^\d+(\.\d+)?$/.test(value) || Number(value) <= 0
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidName = validateName(name);
    const newWarnings = {
      name:
        name.trim() === ""
          ? "Please enter a name."
          : !isValidName
          ? "Expense name must include letters and cannot be just a number."
          : "",
      amount:
        !amount || Number(amount) <= 0
          ? "Please enter a positive number for the amount."
          : "",
      category: category === "" ? "Please select a category." : "",
    };

    setWarnings(newWarnings);

    if (Object.values(newWarnings).some((warning) => warning !== "")) {
      setAlert({ type: "danger", message: "Please fix the errors before submitting." });
      return;
    }

    const newExpense = {
      name,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await addExpense(newExpense);
      setName("");
      setAmount("");
      setCategory("");
      setWarnings({ name: "", amount: "", category: "" });
      setAlert({ type: "success", message: "Expense added successfully!" });
    } catch (err) {
      setAlert({ type: "danger", message: "Error adding expense. Please try again." });
    }
  };

  return {
    name,
    amount,
    category,
    alert,
    warnings,
    loading,
    categories,
    handleNameChange,
    handleAmountChange,
    handleCategoryChange,
    handleSubmit,
  };
};

export default useAddExpenseForm;
