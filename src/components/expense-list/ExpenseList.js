import React, { useEffect } from "react";
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

  useEffect(() => {
    if (editing?.key === "date") {
      const $datepicker = $(`#datepicker-${editing.index}`);
      $datepicker
        .datepicker({
          format: "yyyy-mm-dd",
          autoclose: true,
          todayHighlight: true,
          orientation: "bottom",
          defaultViewDate: { 
            year: new Date().getFullYear(), 
            month: new Date().getMonth(), 
            day: new Date().getDate() 
          },
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
        $datepicker.datepicker("update");
      } else {
        $datepicker.datepicker("setDate", editValue);
        $datepicker.datepicker("update");
      }
    }
  }, [editing, editValue, handleEditConfirm]);
  

  const getSortIcon = (key) => {
    if (sortConfig.key !== key || sortConfig.direction === "none") {
      return '<i class="bi bi-arrow-down-up"></i>';
    }
    return sortConfig.direction === "ascending"
      ? '<i class="bi bi-sort-numeric-up"></i>'
      : '<i class="bi bi-sort-numeric-down"></i>';
  };

  return (
    <section
      className={`p-4 border rounded equal-height d-flex flex-column expense-list-section ${theme}`}
    >
      <h5>Expense List</h5>
      <div className="mb-3">
        <label htmlFor="filter-category">Filter by Category:</label>
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
            {sortedExpenses.map((expense, index) => (
              <tr key={expense.id}>
                {["name", "amount", "category", "date"].map((key) => (
                  <td key={key} className={`editable-cell ${theme}`}>
                    {editing?.index === index && editing?.key === key ? (
                      key === "category" ? (
                        <select
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
                          autoFocus
                        />
                      ) : (
                        <input
                          type={key === "amount" ? "text" : "text"}
                          className={`form-control ${theme}`}
                          value={editValue}
                          onChange={(e) =>
                            handleEditStart(index, key, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyPress(e, index, key)}
                          autoFocus
                        />
                      )
                    ) : (
                      <span
                        className="editable-text"
                        onClick={() =>
                          handleEditStart(index, key, expense[key])
                        }
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
