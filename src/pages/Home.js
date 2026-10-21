import React from 'react';
import { formatMoney } from '../data';

const Home = ({ expenses }) => {
  const totalCount = expenses.length;
  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);
  const unpaidAmount = expenses
    .filter((item) => !item.paid)
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="home-page">
      <h1>Chi tiêu cá nhân</h1>
      <div className="home-stats">
        <div>Tổng số khoản chi: {totalCount}</div>
        <div>Tổng số tiền đã chi: {formatMoney(totalAmount)}</div>
        <div>Tổng số tiền chưa thanh toán: {formatMoney(unpaidAmount)}</div>
      </div>
    </div>
  );
};

export default Home;
