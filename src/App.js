import React from "react";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummaryChart from "./components/ExpenseSummaryChart";

function App() {
  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-6">
          <AddExpenseForm />
        </div>
        <div className="col-md-6">
          <ExpenseList />
        </div>
        <div className="col-12">
          <ExpenseSummaryChart />
        </div>
      </div>
    </div>
  );
}

export default App;
