import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  // Expense State
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Groceries", amount: 50 },
    { id: 2, title: "Rent", amount: 500 },
    { id: 3, title: "Entertainment", amount: 100 },
  ]);

  // Form State
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Handle Form Submission
  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    const newExpense = {
      id: expenses.length + 1,
      title,
      amount: parseFloat(amount),
    };
    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  };

  // Chart Data
  const chartData = {
    labels: expenses.map((exp) => exp.title),
    datasets: [
      {
        data: expenses.map((exp) => exp.amount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="container mt-4">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark mb-4">
        <span className="navbar-brand mx-auto">💰 Expense Tracker</span>
      </nav>

      <div className="row">
        {/* Expense Form */}
        <div className="col-md-6">
          <h4>Add Expense</h4>
          <form onSubmit={addExpense} className="mb-3">
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Expense Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Expense
            </button>
          </form>

          {/* Expense List */}
          <ul className="list-group">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {expense.title}
                <span className="badge bg-success">${expense.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expense Chart */}
        <div className="col-md-6">
          <h4>Expense Chart</h4>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default App;
