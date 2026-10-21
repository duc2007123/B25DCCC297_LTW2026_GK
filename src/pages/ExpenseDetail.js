import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseDetail = ({ expenses }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const expenseId = Number(id);
  const expense = expenses.find((item) => item.id === expenseId);

  if (!expense) {
    return (
      <div className="expense-detail-page">
        <p className="error-text">Không tìm thấy khoản chi</p>
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="expense-detail-page">
      <h2>Chi tiết khoản chi</h2>
      <div>Tên khoản chi: {expense.title}</div>
      <div>Số tiền: {formatMoney(expense.amount)}</div>
      <div>Danh mục: {expense.category}</div>
      <div>Ngày: {expense.date}</div>
      <div>Trạng thái: {expense.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>

      <button
        type="button"
        className="btn-back"
        onClick={() => navigate(-1)}
      >
        Quay lại
      </button>
    </div>
  );
};

export default ExpenseDetail;
