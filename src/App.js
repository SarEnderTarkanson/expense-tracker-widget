import React from "react";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import { data } from "./constants/constants";
import { useTheme } from "./context/ThemeContext";
import "./App.css";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: theme === "light" ? "#f9f9f9" : "#333",
          color: theme === "light" ? "#000" : "#fff",
        }}
      >
        <h1 id="app-title">Expense Tracker</h1>
        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 12px",
            fontSize: "14px",
            background: theme === "light" ? "#000" : "#fff",
            color: theme === "light" ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
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
            <div className="col-12">
              <ExpenseChart data={data} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
