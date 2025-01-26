import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./styles.css";

function AddExpenseForm() {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [warnings, setWarnings] = useState({
    name: "",
    amount: "",
    category: "",
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.trim() !== "") {
      setWarnings((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (value === "" || (value > 0 && !isNaN(value))) {
      setAmount(value);
      setWarnings((prev) => ({ ...prev, amount: "" }));
    } else {
      setWarnings((prev) => ({
        ...prev,
        amount: "Only positive numbers are allowed.",
      }));
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "") {
      setWarnings((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newWarnings = {};

    if (name.trim() === "") {
      newWarnings.name = "Please enter a name.";
      formIsValid = false;
    }

    if (!amount || amount <= 0) {
      newWarnings.amount = "Please enter a positive number for the amount.";
      formIsValid = false;
    }

    if (category === "") {
      newWarnings.category = "Please select a category.";
      formIsValid = false;
    }

    if (!formIsValid) {
      setWarnings(newWarnings);
      return;
    }

    console.log("Expense added:", { name, amount, category });
  };

  return (
    <section
      className="p-4 border rounded equal-height d-flex flex-column"
      aria-labelledby="add-expense-form-title"
      style={{
        backgroundColor: theme === "light" ? "#f9f9f9" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        borderColor: theme === "light" ? "#ccc" : "#555",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <h5 id="add-expense-form-title">Add Expense</h5>
      <form className="d-flex flex-column" onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter expense name"
            aria-required="true"
            required
            style={{
              backgroundColor: theme === "light" ? "#fff" : "#444",
              color: theme === "light" ? "#000" : "#fff",
              borderColor: theme === "light" ? "#ccc" : "#666",
            }}
          />
          {warnings.name && (
            <small id="name-error" className="text-danger" role="alert">
              {warnings.name}
            </small>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            min="1"
            aria-describedby="amount-help amount-error"
            aria-required="true"
            required
            style={{
              backgroundColor: theme === "light" ? "#fff" : "#444",
              color: theme === "light" ? "#000" : "#fff",
              borderColor: theme === "light" ? "#ccc" : "#666",
            }}
          />
          <small id="amount-help" className="form-text text-muted">
            Enter a positive number greater than zero.
          </small>
          {warnings.amount && (
            <small id="amount-error" className="text-danger" role="alert">
              {warnings.amount}
            </small>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-select category-dropdown"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            aria-describedby="category-help"
            required
            style={{
              backgroundColor: theme === "light" ? "#fff" : "#444",
              color: theme === "light" ? "#000" : "#fff",
              borderColor: theme === "light" ? "#ccc" : "#666",
            }}
          >
            <option value="">-- Select a Category --</option>
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Travel">Travel</option>
            <option value="Leisure">Leisure</option>
            <option value="Bills">Bills</option>
            <option value="Services">Services</option>
          </select>
          <small id="category-help" className="form-text text-muted">
            Please specify the category for this expense.
          </small>
          {warnings.category && (
            <small id="category-error" className="text-danger" role="alert">
              {warnings.category}
            </small>
          )}
        </div>

        <div className="d-flex flex-column justify-content-end align-items-center p-3 h-100">
          <button
            type="submit"
            className="btn btn-primary w-50"
            aria-label="Add expense"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddExpenseForm;
