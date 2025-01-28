import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const generateRandomColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
    colors.push(color);
  }
  return colors;
};

const ExpenseContext = createContext();

const initialState = {
  expenseList: [],
  categories: [],
  categoryColors: {},
  loading: false,
  error: null,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_EXPENSES_START":
      return { ...state, loading: true, error: null };
    case "FETCH_EXPENSES_SUCCESS":
      return { ...state, expenseList: action.payload, loading: false };
    case "FETCH_EXPENSES_FAILURE":
      return { ...state, error: action.payload, loading: false };
    case "FETCH_CATEGORIES_SUCCESS":
      const colors = generateRandomColors(action.payload.length);
      const categoryColors = action.payload.reduce((acc, category, index) => {
        acc[category.name] = colors[index];
        return acc;
      }, {});
      return { ...state, categories: action.payload, categoryColors };
    case "ADD_EXPENSE_SUCCESS":
      return { ...state, expenseList: [...state.expenseList, action.payload] };
    case "UPDATE_EXPENSE_SUCCESS":
      return {
        ...state,
        expenseList: state.expenseList.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const expenseApiUrl = "http://localhost:3500/expense_list";
  const categoriesApiUrl = "http://localhost:3501/categories";

  const fetchExpenses = async () => {
    dispatch({ type: "FETCH_EXPENSES_START" });
    try {
      const response = await axios.get(expenseApiUrl);
      dispatch({ type: "FETCH_EXPENSES_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "FETCH_EXPENSES_FAILURE", payload: err.message });
      console.error("Error fetching expenses:", err.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(categoriesApiUrl);
      dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: response.data });
    } catch (err) {
      console.error("Error fetching categories:", err.message);
    }
  };

  const addExpense = async (expense) => {
    try {
      const newExpense = { ...expense, id: uuidv4() };
      const response = await axios.post(expenseApiUrl, newExpense);
      dispatch({ type: "ADD_EXPENSE_SUCCESS", payload: response.data });
    } catch (err) {
      console.error("Error adding expense:", err.message);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const response = await axios.put(`${expenseApiUrl}/${id}`, updatedExpense);
      dispatch({ type: "UPDATE_EXPENSE_SUCCESS", payload: response.data });
    } catch (err) {
      console.error("Error updating expense:", err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        fetchExpenses,
        fetchCategories,
        addExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
