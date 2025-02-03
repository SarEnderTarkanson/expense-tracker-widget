import React, { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import useExpenseList from "../../hooks/useExpenseList";
import $ from "jquery";
import "bootstrap-datepicker";
import "./expense-list-styles.css";
import "../styles.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ExpenseList = () => {
  const { theme } = useTheme();
  const {
    sortedExpenses,
    categories,
    sortConfig,
    filterCategory,
    editing,
    editValue,
    error,
    handleSort,
    handleFilterChange,
    handleEditStart,
    handleEditConfirm,
    handleKeyPress,
  } = useExpenseList();

  const editFieldRef = useRef(null);

  useEffect(() => {
    if (editing?.key === "date") {
      const $datepicker = $(`#datepicker-${editing.index}`);
      $datepicker
        .datepicker({
          format: "yyyy-mm-dd",
          autoclose: true,
          todayHighlight: true,
          orientation: "bottom",
        })
        .on("changeDate", (e) => {
          handleEditConfirm(editing.index, "date", e.format());
        })
        .on("show", () => {
          $(".datepicker").css("cursor", "pointer");
        });

      $datepicker.datepicker("show");

      if (!editValue) {
        $datepicker.datepicker("setDate", new Date());
      } else {
        $datepicker.datepicker("setDate", editValue);
      }
    }

    if (editing) {
      editFieldRef.current?.focus();
    }
  }, [editing, editValue, handleEditConfirm]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key || sortConfig.direction === "none") {
      return <i className="bi bi-arrow-down-up" aria-hidden="true"></i>;
    }

    const isAlphaSort = key === "name" || key === "category";

    return sortConfig.direction === "ascending" ? (
      <i
        className={`bi ${
          isAlphaSort ? "bi-sort-alpha-up" : "bi-sort-numeric-up"
        }`}
        aria-hidden="true"
      ></i>
    ) : (
      <i
        className={`bi ${
          isAlphaSort ? "bi-sort-alpha-down" : "bi-sort-numeric-down"
        }`}
        aria-hidden="true"
      ></i>
    );
  };

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column expense-list-section ${theme}`}
      aria-labelledby="expense-list-title"
    >
      <h5 id="expense-list-title">Expense List</h5>

      <div className="mb-3">
        <label htmlFor="filter-category">Filter by Category:</label>
        <select
          id="filter-category"
          className={`form-select filter-category-select ${theme}`}
          value={filterCategory}
          onChange={handleFilterChange}
          aria-label="Filter expenses by category"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={`expense-list-scroll-container ${theme}`} role="table">
        <table className="table">
          <thead>
            <tr>
              {["name", "amount", "category", "date"].map((key) => (
                <th key={key} className={`expense-list-table-header ${theme}`}>
                  <button
                    className={`btn btn-link p-0 d-flex align-items-center gap-1 ${theme}`}
                    onClick={() => handleSort(key)}
                    aria-label={`Sort by ${key}`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {getSortIcon(key)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody aria-live="polite">
            {sortedExpenses.map((expense, index) => (
              <tr key={expense.id}>
                {["name", "amount", "category", "date"].map((key) => (
                  <td key={key} className={`editable-cell ${theme}`}>
                    {editing?.index === index && editing?.key === key ? (
                      key === "category" ? (
                        <select
                          ref={editFieldRef}
                          className={`form-select filter-category-select ${theme}`}
                          value={editValue}
                          onChange={(e) =>
                            handleEditStart(index, key, e.target.value)
                          }
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
                          ref={editFieldRef}
                          autoFocus
                        />
                      ) : (
                        <input
                          ref={editFieldRef}
                          type={key === "amount" ? "number" : "text"}
                          className={`form-control ${theme}`}
                          value={editValue}
                          onChange={(e) =>
                            handleEditStart(index, key, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyPress(e, index, key)}
                          autoFocus
                          aria-label={`Edit ${key}`}
                        />
                      )
                    ) : (
                      <span
                        className="editable-text"
                        tabIndex="0"
                        role="button"
                        onClick={() =>
                          handleEditStart(index, key, expense[key])
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleEditStart(index, key, expense[key]);
                          }
                        }}
                        aria-label={`Edit ${key}: ${expense[key]}`}
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

      {error && (
        <p className="error-text text-danger mt-2" role="alert">
          {error}
        </p>
      )}
    </section>
  );
};

export default ExpenseList;
