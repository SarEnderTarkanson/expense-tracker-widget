import React from "react";

function AddExpenseForm() {
  return (
    <div className="p-3 border rounded bg-light equal-height d-flex flex-column">
      <h5>Add Expense</h5>
      <form className="d-flex flex-column h-100">
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Expense description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            placeholder="Amount"
          />
        </div>
        <div className="d-flex justify-content-center mt-auto">
          <button type="submit" className="btn btn-primary w-50">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddExpenseForm;
