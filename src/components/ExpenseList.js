import React from "react";
import "./styles.css";

function ExpenseList() {
  return (
    <div className="p-3 border rounded bg-light expense-list-container">
      <h5>Expense List</h5>
      <ul className="list-group expense-list">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Groceries <span className="badge bg-primary rounded-pill">$50</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Rent <span className="badge bg-primary rounded-pill">$1200</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Transport <span className="badge bg-primary rounded-pill">$30</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Entertainment{" "}
          <span className="badge bg-primary rounded-pill">$200</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Utilities <span className="badge bg-primary rounded-pill">$150</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Subscriptions{" "}
          <span className="badge bg-primary rounded-pill">$25</span>
        </li>
      </ul>
    </div>
  );
}

export default ExpenseList;
