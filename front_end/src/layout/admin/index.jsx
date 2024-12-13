import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-auto flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className={`w-full bg-gray-800 text-white p-4 ${
          isMenuOpen ? "block" : "hidden"
        } md:block md:w-64 md:h-auto`}
      >
        <ul className="flex md:block justify-center md:justify-start">
          <li className="md:mt-4 mt-2 ml-6 md:ml-0">
            <Link to="/admin" className="block text-center md:text-left">
              Thống kê
            </Link>
          </li>
          <li className="mt-4">
            <Link to="/admin/" className="block text-center md:text-left">
              Quản lý tin tức
            </Link>
          </li>
          <li className="mt-4">
            <Link
              to="/admin/banners"
              className="block text-center md:text-left"
            >
              Quản lý Banner
            </Link>
          </li>
          <li className="mt-4">
            <Link to="/" className="block text-center md:text-left">
              Về trang chủ
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 md:p-8 mt-4">
        {/* Mobile Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden absolute text-4xl top-7 left-2"
        >
          {/* Conditional color: white for '×' and black for '☰' */}
          <span className={isMenuOpen ? "text-white" : "text-black"}>
            {isMenuOpen ? "×" : "☰"}
          </span>
        </button>

        {/* Header */}
        <header className="bg-white hidden md:block shadow p-4">
          <h1 className="text-2xl font-bold">Welcome to Admin Panel</h1>
        </header>

        {/* Main Content */}
        <main className="mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
