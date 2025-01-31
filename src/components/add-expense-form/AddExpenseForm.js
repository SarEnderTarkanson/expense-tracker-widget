import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useExpenses } from "../../context/ExpenseContext";
import "./add-expense-form-styles.css";
import "../styles.css";

const AddExpenseForm = () => {
  const { theme } = useTheme();
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

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const isValidName = /[a-zA-Z]/.test(value) && !/^\d+(\.\d+)?$/.test(value);

    setWarnings((prev) => ({
      ...prev,
      name: isValidName
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

    const isValidName = /[a-zA-Z]/.test(name) && !/^\d+(\.\d+)?$/.test(name);

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

    const formIsValid = Object.values(newWarnings).every(
      (warning) => warning === ""
    );
    if (!formIsValid) {
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
      setAlert({
        type: "danger",
        message: "Error adding expense. Please try again.",
      });
    }
  };

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column add-expense-section ${theme}`}
      aria-labelledby="add-expense-form-title"
    >
      <h5 id="add-expense-form-title">Add Expense</h5>
      {alert && (
        <div className={`alert alert-${alert.type} fade show`} role="alert">
          {alert.message}
        </div>
      )}
      <form className="d-flex flex-column" onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control input-field ${theme}`}
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter expense name"
            required
          />
          {warnings.name && (
            <small className="text-danger">{warnings.name}</small>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="text"
            className={`form-control input-field ${theme}`}
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            required
          />
          {warnings.amount && (
            <small className="text-danger">{warnings.amount}</small>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className={`form-select category-dropdown ${theme}`}
            value={category}
            onChange={handleCategoryChange}
            required
            disabled={loading}
          >
            <option value="">-- Select a Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {warnings.category && (
            <small className="text-danger">{warnings.category}</small>
          )}
        </div>

        <div className="d-flex flex-column justify-content-end align-items-center p-3 h-100">
          <button type="submit" className="btn btn-primary w-50">
            Add
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddExpenseForm;
