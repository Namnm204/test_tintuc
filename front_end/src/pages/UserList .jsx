import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userUpdated, setuserUpdated] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://my-worker.namdaynay001.workers.dev/"
      );
      setUsers(response.data);
      setuserUpdated(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userUpdated]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://my-worker.namdaynay001.workers.dev/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Update the user list
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User List</h1>
      <Link
        to="/add"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Add User
      </Link>
      {users.length === 0 ? (
        <div className="text-gray-600">No users available.</div>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4 text-sm text-gray-800">{user.name}</td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {user["email "].trim()}
                </td>
                <td className="py-2 px-4 text-sm">
                  <Link
                    to={`/edit/${user.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
