import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const addTransaction = () => {
    if (!amount || !category) return;

    const newTransaction = {
      type,
      amount: Number(amount),
      category,
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setCategory("");
  };

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const summary = {};

  transactions.forEach((t) => {
    if (t.type === "Expense") {
      summary[t.category] =
        (summary[t.category] || 0) + t.amount;
    }
  });

  return (
    <div className="container">
      <h1>Daily Expense Analytics</h1>

      <div className="form">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={addTransaction}>
          Add
        </button>
      </div>

      <div className="summary">
        <h3>Total Income: ₹{income}</h3>
        <h3>Total Expense: ₹{expense}</h3>
        <h2>Balance: ₹{balance}</h2>
      </div>

      <h2>Transactions</h2>
      <ul>
        {transactions.map((t, index) => (
          <li key={index}>
            {t.type} - ₹{t.amount} ({t.category})
          </li>
        ))}
      </ul>

      <h2>Category Summary</h2>
      <ul>
        {Object.keys(summary).map((cat) => (
          <li key={cat}>
            {cat}: ₹{summary[cat]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;