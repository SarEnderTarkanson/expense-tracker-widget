import React from "react";
import AddExpenseForm from "./components/add-expense-form/AddExpenseForm";
import ExpenseList from "./components/expense-list/ExpenseList";
import ExpenseChart from "./components/expense-chart/ExpenseChart";
import ExpenseLineChart from "./components/expense-line-chart/ExpenseLineChart";
import { data, mockData } from "./constants/constants";
import { useTheme } from "./context/ThemeContext";
import "./App.css";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className={`header ${theme}`}>
        <h1 id="app-title">Expense Tracker</h1>
        <button className={`theme-toggle-btn ${theme}`} onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>
      <main className="container mt-4" role="main">
        <div className="container mt-4">
          <div className="row g-4">
            <div className="col-md-6">
              <AddExpenseForm />
            </div>
            <div className="col-md-6">
              <ExpenseList />
            </div>
            <div className="col-md-6">
              <ExpenseChart data={data} />
            </div>
            <div className="col-md-6">
              <ExpenseLineChart data={mockData} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
