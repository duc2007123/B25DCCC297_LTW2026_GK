import React from 'react';
import { CATEGORIES } from '../data';

const FilterBar = ({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="search">Tìm kiếm</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Nhập tên khoản chi..."
        />
      </div>
      <div className="filter-group">
        <label htmlFor="category">Danh mục</label>
        <select
          id="category"
          value={categoryFilter}
          onChange={onCategoryChange}
        >
          <option value="Tất cả">Tất cả</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
