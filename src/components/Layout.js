import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  return (
    <div className="app-container">
      <NavBar />
      <main>
        {loading ? (
          <div className="loading-text">Đang tải...</div>
        ) : error ? (
          <div className="error-text">{error}</div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Layout;
