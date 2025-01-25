import React from "react";
import "./styles.css";

function ExpenseList() {
  return (
    <section
      className="p-3 border rounded bg-light expense-list-container"
      aria-labelledby="expense-list-title"
    >
      <h5 id="expense-list-title">Expense List</h5>
      <ul className="list-group expense-list" role="list">
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          role="listitem"
        >
          <span>Groceries</span>
          <span
            className="badge bg-primary rounded-pill"
            aria-label="Amount spent on Groceries: $50"
          >
            $50
          </span>
        </li>
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          role="listitem"
        >
          <span>Rent</span>
          <span
            className="badge bg-primary rounded-pill"
            aria-label="Amount spent on Rent: $1200"
          >
            $1200
          </span>
        </li>
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          role="listitem"
        >
          <span>Transport</span>
          <span
            className="badge bg-primary rounded-pill"
            aria-label="Amount spent on Transport: $30"
          >
            $30
          </span>
        </li>
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          role="listitem"
        >
          <span>Entertainment</span>
          <span
            className="badge bg-primary rounded-pill"
            aria-label="Amount spent on Entertainment: $200"
          >
            $200
          </span>
        </li>
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          role="listitem"
        >
          <span>Utilities</span>
          <span
            className="badge bg-primary rounded-pill"
            aria-label="Amount spent on Utilities: $150"
          >
            $150
          </span>
        </li>
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          role="listitem"
        >
          <span>Subscriptions</span>
          <span
            className="badge bg-primary rounded-pill"
            aria-label="Amount spent on Subscriptions: $25"
          >
            $25
          </span>
        </li>
      </ul>
    </section>
  );
}

export default ExpenseList;
