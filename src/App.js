import React from "react";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import {data} from './constants/constants'
import './App.css'

function App() {
  return (
    <>
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
              <ExpenseChart data={data}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
