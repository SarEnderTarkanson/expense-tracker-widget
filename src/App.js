import React from "react";
import Header from "./components/header/Header";
import AddExpenseForm from "./components/add-expense-form/AddExpenseForm";
import ExpenseList from "./components/expense-list/ExpenseList";
import ExpensePieChart from "./components/expense-pie-chart/ExpensePieChart";
import ExpenseLineChart from "./components/expense-line-chart/ExpenseLineChart";

const App = () => {
  return (
    <>
      <Header />
      <main className="container mt-4" role="main" aria-labelledby="app-title">
        <div className="container mt-4">
          <div className="row g-4">
            <div className="col-md-6">
              <AddExpenseForm />
            </div>
            <div className="col-md-6">
              <ExpenseList />
            </div>
            <div className="col-md-6">
              <ExpensePieChart />
            </div>
            <div className="col-md-6">
              <ExpenseLineChart />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
