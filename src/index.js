import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ExpenseProvider } from "./context/ExpenseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ExpenseProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ExpenseProvider>
  </React.StrictMode>
);
