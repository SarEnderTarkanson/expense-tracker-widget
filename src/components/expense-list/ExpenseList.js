import React, { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import useExpenseList from "../../hooks/useExpenseList";
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
    localError,
    handleSort,
    handleFilterChange,
    handleEditStart,
    handleKeyPress,
    clearError,
  } = useExpenseList();

  const editFieldRef = useRef(null);

  useEffect(() => {
    if (editing) {
      editFieldRef.current?.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key || sortConfig.direction === "none") {
      return (
        <i
          className="bi bi-arrow-down-up sort-icon-neutral"
          aria-hidden="true"
        ></i>
      );
    }

    return sortConfig.direction === "ascending" ? (
      <i className="bi bi-arrow-up sort-icon-ascending" aria-hidden="true"></i>
    ) : (
      <i
        className="bi bi-arrow-down sort-icon-descending"
        aria-hidden="true"
      ></i>
    );
  };

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column expense-list-section ${theme}`}
      aria-labelledby="expense-list-title"
    >
      <h4 id="expense-list-title" className={`expense-list-title ${theme}`}>
        <i className="bi bi-list-ul expense-list-icon"></i> Expense List
      </h4>

      {error && (
        <div className="alert alert-danger fade show" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="filter-category" className={`filter-label ${theme}`}>
          Filter by Category:
        </label>
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
        {sortedExpenses.length === 0 ? (
          <div className={`no-data-container ${theme}`}>
            <p className={`no data-container ${theme}`} aria-live="polite">
              No data available yet.
            </p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                {["name", "amount", "category", "date"].map((key) => (
                  <th
                    key={key}
                    className={`expense-list-table-header ${theme}`}
                  >
                    <button
                      className={`sort-button ${theme}`}
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
                            type="date"
                            className={`form-control ${theme}`}
                            value={editValue || ""}
                            onChange={(e) =>
                              handleEditStart(index, key, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyPress(e, index, key)}
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
        )}
      </div>

      {localError && (
        <p className="error-text text-warning mt-2" role="alert">
          {localError}
        </p>
      )}
    </section>
  );
};

export default ExpenseList;
