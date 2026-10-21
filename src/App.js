import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2.4. Gọi API và lifecycle với useEffect (Mounting)
  useEffect(() => {
    // Nâng cao - đọc dữ liệu đã lưu
    const savedExpenses = localStorage.getItem('gk_expenses');
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
        setLoading(false);
        return;
      } catch (err) {
        console.error('Lỗi đọc localStorage:', err);
      }
    }

    // Tải dữ liệu từ API
    const controller = new AbortController();
    axios
      .get('/data/expenses.json', { signal: controller.signal })
      .then((res) => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // Nâng cao - hủy request (Unmounting)
        if (axios.isCancel(err)) {
          return;
        }
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  // Nâng cao - lưu dữ liệu (Updating)
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_expenses', JSON.stringify(expenses));
    }
  }, [expenses, loading]);

  // Các hàm thêm, xóa, cập nhật
  const handleTogglePaid = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((item) =>
        item.id === id ? { ...item, paid: !item.paid } : item
      )
    );
  };

  const handleDelete = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((item) => item.id !== id)
    );
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home expenses={expenses} />} />
        <Route
          path="expenses"
          element={
            <ExpenseList
              expenses={expenses}
              onTogglePaid={handleTogglePaid}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="expenses/new"
          element={
            <AddExpense
              expenses={expenses}
              onAddExpense={handleAddExpense}
            />
          }
        />
        <Route
          path="expenses/:id"
          element={<ExpenseDetail expenses={expenses} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
