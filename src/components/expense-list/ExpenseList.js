import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useExpenses } from "../../context/ExpenseContext";
import "./expense-list-styles.css";
import "../styles.css";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import $ from "jquery";
import "bootstrap-datepicker";
import "bootstrap-icons/font/bootstrap-icons.css";

const ExpenseList = () => {
  const { theme } = useTheme();
  const { expenseList, categories, updateExpense } = useExpenses();

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "none",
  });
  const [filterCategory, setFilterCategory] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editing?.key === "date") {
      const $datepicker = $(`#datepicker-${editing.index}`);
      $datepicker
        .datepicker({
          format: "yyyy-mm-dd",
          autoclose: true,
          todayHighlight: true,
        })
        .on("changeDate", function (e) {
          handleEditConfirm(editing.index, "date", e.format());
        });
      $datepicker.datepicker("show");
    }

    const handleOutsideClick = (event) => {
      if (editing && !event.target.closest(".editable-cell")) {
        setEditing(null);
        setEditValue("");
        setError(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [editing]);

  const sortedExpenses = [...expenseList].sort((a, b) => {
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
      return '<i class="bi bi-arrow-down-up"></i>';
    }
    if (key === "category") {
      return sortConfig.direction === "ascending"
        ? '<i class="bi bi-sort-alpha-up"></i>'
        : '<i class="bi bi-sort-alpha-down"></i>';
    }
    return sortConfig.direction === "ascending"
      ? '<i class="bi bi-sort-numeric-up"></i>'
      : '<i class="bi bi-sort-numeric-down"></i>';
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleEditStart = (index, key, value) => {
    setEditing({ index, key });
    setEditValue(value);
    setError(null);
  };

  const handleEditConfirm = (index, key, value = null) => {
    const finalValue = value || editValue;

    if (key === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(finalValue)) {
      setError("Date must be in YYYY-MM-DD format.");
      return;
    }

    const updatedExpense = {
      ...filteredExpenses[index],
      [key]: key === "amount" ? parseFloat(finalValue) : finalValue,
    };
    updateExpense(updatedExpense.id, updatedExpense);
    setEditing(null);
    setEditValue("");
    setError(null);
  };

  const handleKeyPress = (e, index, key) => {
    if (e.key === "Enter") {
      handleEditConfirm(index, key);
    } else if (e.key === "Escape") {
      setEditing(null);
      setEditValue("");
      setError(null);
    }
  };

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column expense-list-section ${theme}`}
      aria-labelledby="expense-list-title"
    >
      <h5 id="expense-list-title">Expense List</h5>
      <div className="mb-3">
        <label htmlFor="filter-category" className="form-label">
          Filter by Category:
        </label>
        <select
          id="filter-category"
          className={`form-select filter-category-select ${theme}`}
          value={filterCategory}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className={`expense-list-scroll-container ${theme}`}>
        <table className="table">
          <thead>
            <tr>
              <th className={`expense-list-table-header ${theme}`}>Name</th>
              <th className={`expense-list-table-header ${theme}`}>
                Amount
                <button
                  className={`btn btn-link p-0 d-flex align-items-center gap-1 ${theme}`}
                  onClick={() => handleSort("amount")}
                  dangerouslySetInnerHTML={{ __html: getSortIcon("amount") }}
                />
              </th>
              <th className={`expense-list-table-header ${theme}`}>
                Category
                <button
                  className={`btn btn-link p-0 d-flex align-items-center gap-1 ${theme}`}
                  onClick={() => handleSort("category")}
                  dangerouslySetInnerHTML={{ __html: getSortIcon("category") }}
                />
              </th>
              <th className={`expense-list-table-header ${theme}`}>
                Date
                <button
                  className={`btn btn-link p-0 d-flex align-items-center gap-1 ${theme}`}
                  onClick={() => handleSort("date")}
                  dangerouslySetInnerHTML={{ __html: getSortIcon("date") }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => (
              <tr key={expense.id}>
                {Object.keys(expense)
                  .slice(1)
                  .map((key) => (
                    <td key={key} className={`editable-cell ${theme}`}>
                      {editing?.index === index && editing?.key === key ? (
                        key === "category" ? (
                          <select
                            className={`form-select filter-category-select ${theme}`}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, index, key)}
                            autoFocus
                          >
                            {categories.map((category) => (
                              <option key={category.id} value={category.name}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        ) : key === "date" ? (
                          <input
                            id={`datepicker-${index}`}
                            type="text"
                            className={`form-control ${theme}`}
                            readOnly
                            autoFocus
                          />
                        ) : (
                          <input
                            type={key === "amount" ? "number" : "text"}
                            className={`form-control ${theme}`}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, index, key)}
                            autoFocus
                          />
                        )
                      ) : (
                        <span
                          onClick={() =>
                            handleEditStart(index, key, expense[key])
                          }
                          className="editable-text"
                        >
                          {expense[key]}
                        </span>
                      )}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p className="error-text text-danger mt-2">{error}</p>}
    </section>
  );
};

export default ExpenseList;
