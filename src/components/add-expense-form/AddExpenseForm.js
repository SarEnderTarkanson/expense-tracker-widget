import React from "react";
import { useTheme } from "../../context/ThemeContext";
import useAddExpenseForm from "../../hooks/useAddExpenseForm";
import "./add-expense-form-styles.css";
import "../styles.css";

const AddExpenseForm = () => {
  const { theme } = useTheme();
  const {
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
  } = useAddExpenseForm();

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
