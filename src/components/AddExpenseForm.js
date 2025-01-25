import React, { useState } from "react";
import "./styles.css";

function AddExpenseForm() {
  const [amount, setAmount] = useState("");
  const [warning, setWarning] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (value === "" || (value > 0 && !isNaN(value))) {
      setAmount(value);
      setWarning("");
    } else {
      setWarning("Only positive numbers are allowed.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setWarning("Please enter a positive number for the amount.");
      return;
    }
    console.log("Expense added:", { amount });
  };

  return (
    <div
      className="p-4 border rounded bg-light equal-height d-flex flex-column"
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
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter expense name"
            aria-required="true"
            required
          />
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
          />
          <small id="amount-help" className="form-text text-muted">
            Enter a positive number greater than zero.
          </small>
          {warning && (
            <small id="amount-error" className="text-danger" role="alert">
              {warning}
            </small>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            placeholder="Enter category"
            aria-describedby="category-help"
          />
          <small id="category-help" className="form-text text-muted">
            Please specify the category for this expense.
          </small>
        </div>

        <div className="d-flex justify-content-center mt-auto">
          <button
            type="submit"
            className="btn btn-primary w-50"
            aria-label="Add expense"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddExpenseForm;
