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

    if (isValidName) {
      setWarnings((prev) => ({ ...prev, name: "" }));
    } else {
      setWarnings((prev) => ({
        ...prev,
        name: "Expense name must include letters and cannot be just a number.",
      }));
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.trim();
  
    if (value === "") {
      setAmount("");
      setWarnings((prev) => ({
        ...prev,
        amount: "Amount is required.",
      }));
      return;
    }
  
    if (!/^\d+(\.\d+)?$/.test(value) || Number(value) <= 0) {
      setWarnings((prev) => ({
        ...prev,
        amount: "Please enter a valid positive number.",
      }));
      return;
    }
  
    setAmount(value);
    setWarnings((prev) => ({ ...prev, amount: "" }));
  };
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "") {
      setWarnings((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleSubmit = async (e) => {
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
      console.log("Expense added successfully:", newExpense);
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column add-expense-section ${theme}`}
      aria-labelledby="add-expense-form-title"
    >
      <h5 id="add-expense-form-title">Add Expense</h5>
      <form className="d-flex flex-column" onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control input-field ${theme}`}
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter expense name"
            aria-required="true"
            required
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
            type="text"
            className={`form-control input-field ${theme}`}
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount (positive number)"
            aria-describedby="amount-help amount-error"
            aria-required="true"
            required
          />

          {warnings.amount && (
            <small
              id="amount-error"
              className={`text-danger small-text ${theme}`}
              role="alert"
            >
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
            className={`form-select category-dropdown ${theme}`}
            name="category"
            value={category}
            onChange={handleCategoryChange}
            aria-describedby="category-help"
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
            <small
              id="category-error"
              className={`text-danger small-text ${theme}`}
              role="alert"
            >
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
};

export default AddExpenseForm;
