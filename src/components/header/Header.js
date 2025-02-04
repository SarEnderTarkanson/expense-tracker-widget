import React from "react";
import { useTheme } from "../../context/ThemeContext";
import "./header.css";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header ${theme}`} role="banner">
      <h1 id="app-title" className={`app-title ${theme}`}>
        <i className="bi bi-wallet2 header-icon"></i> Expense Tracker
      </h1>
      <button className={`theme-toggle-btn ${theme}`} onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
};

export default Header;
