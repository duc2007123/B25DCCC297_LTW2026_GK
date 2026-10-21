import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddExpense = ({ expenses, onAddExpense }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Kiểm tra ô trống (mục 4)
    if (!title.trim() || amount === '' || !date.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    // 2. Kiểm tra số tiền (mục 8)
    const numAmount = Number(amount);
    if (
      !Number.isInteger(numAmount) ||
      numAmount < 1000 ||
      numAmount > 100000000
    ) {
      setErrorMessage('Số tiền phải từ 1.000 đến 100.000.000');
      return;
    }

    // Tính mã id mới = mã lớn nhất hiện có cộng 1
    const nextId =
      expenses.length > 0 ? Math.max(...expenses.map((item) => item.id)) + 1 : 1;

    const newExpense = {
      id: nextId,
      title: title.trim(),
      amount: numAmount,
      category,
      date,
      paid: false,
    };

    onAddExpense(newExpense);
    navigate('/expenses', { replace: true });
  };

  return (
    <div className="add-expense-page">
      <h2>Thêm khoản chi mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tên khoản chi</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Số tiền</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Ngày chi</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit">
          Thêm
        </button>

        {errorMessage && <div className="form-error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default AddExpense;
