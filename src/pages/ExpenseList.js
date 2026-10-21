import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses, onTogglePaid, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const isMobile = width < 768;

  const filteredExpenses = expenses.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'Tất cả' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="expense-list-page">
      <div className="device-mode">
        Chế độ: {isMobile ? 'Điện thoại' : 'Máy tính'}
      </div>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        categoryFilter={categoryFilter}
        onCategoryChange={handleCategoryChange}
      />

      <div className="item-count">
        Tìm thấy {filteredExpenses.length} khoản chi
      </div>

      <div className={`table-wrap ${isMobile ? 'mobile' : ''}`}>
        <ExpenseTable
          expenses={filteredExpenses}
          onTogglePaid={onTogglePaid}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default ExpenseList;
