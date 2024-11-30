import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <ul>
          <li className="mt-4">
            <Link to="/admin">Dashboard</Link>
            {/* Khi vào /admin sẽ hiển thị UserList */}
          </li>
          <li className="mt-4">
            <Link to="/admin/">User List</Link>s
            {/* Khi vào /admin/list sẽ hiển thị UserList */}
          </li>
          <li className="mt-4">
            <Link to="/admin/add">Add User</Link> {/* Dẫn đến UserForm */}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-bold">Welcome to Admin Panel</h1>
        </header>
        <main className="mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
