import React from "react";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import './App.css'

function App() {
  return (
    <>
      <head>
        <title>Expense Tracker</title>
      </head>
      <main className="container mt-4" role="main" aria-labelledby="app-title">
        <h1 id="app-title">Expense Tracker</h1>
        <div className="container mt-4">
          <div className="row g-4">
            <div className="col-md-6">
              <AddExpenseForm />
            </div>
            <div className="col-md-6">
              <ExpenseList />
            </div>
            <div className="col-12">
              <ExpenseChart />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
