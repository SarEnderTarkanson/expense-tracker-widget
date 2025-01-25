import React, { useState } from "react";
import "./styles.css";

function ExpenseList() {
  const [expenses, setExpenses] = useState([
    { name: "Groceries", category: "Food", date: "2023-01-01", amount: 50 },
    { name: "Rent", category: "Housing", date: "2023-01-01", amount: 1200 },
    { name: "Transport", category: "Travel", date: "2023-01-02", amount: 30 },
    {
      name: "Entertainment",
      category: "Leisure",
      date: "2023-01-03",
      amount: 200,
    },
    { name: "Utilities", category: "Bills", date: "2023-01-04", amount: 150 },
    {
      name: "Subscriptions",
      category: "Services",
      date: "2023-01-05",
      amount: 25,
    },
  ]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "none",
  });
  const [filterCategory, setFilterCategory] = useState("");

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortConfig.direction === "none") {
      return 0;
    }
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredExpenses = filterCategory
    ? sortedExpenses.filter((expense) => expense.category === filterCategory)
    : sortedExpenses;

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = "none";
      }
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key || sortConfig.direction === "none") {
      return "⇅";
    }
    return sortConfig.direction === "ascending" ? "▲" : "▼";
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  return (
    <section
      className="p-3 border rounded bg-light equal-height expense-list-container"
      aria-labelledby="expense-list-title"
    >
      <h5 id="expense-list-title">Expense List</h5>
      <div className="mb-3">
        <label htmlFor="filter-category" className="form-label">
          Filter by Category:
        </label>
        <select
          id="filter-category"
          className="form-select"
          value={filterCategory}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Housing">Housing</option>
          <option value="Travel">Travel</option>
          <option value="Leisure">Leisure</option>
          <option value="Bills">Bills</option>
          <option value="Services">Services</option>
        </select>
      </div>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                <button
                  className="btn btn-link p-0 d-flex align-items-center gap-1"
                  onClick={() => handleSort("category")}
                >
                  Category {getSortIcon("category")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link p-0 d-flex align-items-center gap-1"
                  onClick={() => handleSort("date")}
                >
                  Date {getSortIcon("date")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link p-0 d-flex align-items-center gap-1"
                  onClick={() => handleSort("amount")}
                >
                  Amount {getSortIcon("amount")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.name}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>${expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExpenseList;
