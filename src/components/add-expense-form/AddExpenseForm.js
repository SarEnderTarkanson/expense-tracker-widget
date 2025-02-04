import React, { useEffect } from "react";
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
    clearAlert,
  } = useAddExpenseForm();

  useEffect(() => {
    if (alert?.type === "success") {
      const timer = setTimeout(() => {
        clearAlert();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [alert, clearAlert]);

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column add-expense-section ${theme}`}
      aria-labelledby="add-expense-form-title"
    >
      <h4 id="add-expense-form-title" className={`add-expense-title ${theme}`}>
        <i className="bi bi-plus-circle add-expense-icon"></i> Add Expense
      </h4>

      {alert && (
        <div
          className={`alert alert-${alert.type} fade show`}
          role="alert"
          aria-live="polite"
        >
          {alert.message}
        </div>
      )}

      <form className="d-flex flex-column" onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend className="visually-hidden">Expense Details</legend>

          <div className="mb-4">
            <label htmlFor="name" className={`form-label ${theme}`}>
              <i className="bi bi-pencil label-icon"></i> Name
            </label>
            <input
              type="text"
              className={`form-control input-field ${theme}`}
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter expense name"
              required
              aria-describedby={warnings.name ? "name-warning" : undefined}
            />
            {warnings.name && (
              <span
                id="name-warning"
                className="text-danger"
                role="alert"
                aria-live="polite"
              >
                {warnings.name}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className={`form-label ${theme}`}>
              <i className="bi bi-cash-stack label-icon"></i> Amount
            </label>
            <input
              type="text"
              className={`form-control input-field ${theme}`}
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              required
              inputMode="decimal"
              aria-describedby={warnings.amount ? "amount-warning" : undefined}
            />
            {warnings.amount && (
              <span
                id="amount-warning"
                className="text-danger"
                role="alert"
                aria-live="polite"
              >
                {warnings.amount}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="category" className={`form-label ${theme}`}>
              <i className="bi bi-tags label-icon"></i> Category
            </label>
            <select
              id="category"
              className={`form-select category-dropdown ${theme}`}
              value={category}
              onChange={handleCategoryChange}
              required
              disabled={loading}
              aria-describedby={
                warnings.category ? "category-warning" : undefined
              }
            >
              <option value="">-- Select a Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {warnings.category && (
              <span
                id="category-warning"
                className="text-danger"
                role="alert"
                aria-live="polite"
              >
                {warnings.category}
              </span>
            )}
          </div>

          <div className="d-flex flex-column justify-content-end align-items-center p-3 h-100">
            <button
              type="submit"
              className="btn btn-primary w-50"
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default AddExpenseForm;
