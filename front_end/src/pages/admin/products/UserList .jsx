import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TintucList = () => {
  const [tintucs, settintucs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tintucUpdated, settintucUpdated] = useState(false);

  const fetchtintucs = async () => {
    try {
      const response = await axios.get(
        "https://my-worker.namdaynay001.workers.dev/"
      );
      settintucs(response.data);
      settintucUpdated(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchtintucs();
  }, [tintucUpdated]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tintuc?")) {
      try {
        await axios.delete(`https://my-worker.namdaynay001.workers.dev/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        settintucs((prevtintucs) =>
          prevtintucs.filter((tintuc) => tintuc.id !== id)
        ); // Update the tintuc list
      } catch (error) {
        console.error("Error deleting tintuc:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">tintuc List</h1>
      <Link
        to="/admin/add"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Add tintuc
      </Link>
      {tintucs.length === 0 ? (
        <div className="text-gray-600">No tintucs available.</div>
      ) : (
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-sm font-medium">ID</th>
              <th className="py-3 px-4 text-sm font-medium">Title</th>
              <th className="py-3 px-4 text-sm font-medium">Description</th>
              <th className="py-3 px-4 text-sm font-medium">Image</th>
              <th className="py-3 px-4 text-sm font-medium">Author</th>
              <th className="py-3 px-4 text-sm font-medium">Category</th>
              <th className="py-3 px-4 text-sm font-medium">Gallery</th>
              <th className="py-3 px-4 text-sm font-medium">Content</th>
              <th className="py-3 px-4 text-sm font-medium">Created At</th>
              <th className="py-3 px-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tintucs.map((tintuc, index) => (
              <tr
                key={tintuc.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="py-3 px-4 text-sm text-center text-gray-800">
                  {index + 1}
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-800">
                  {tintuc.title}
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-800">
                  {tintuc.description}
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-800">
                  <img src={tintuc.image} alt="ảnh chính" width={"50px"} />
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-800">
                  {tintuc.author}
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-800">
                  {tintuc.category}
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-800">
                  {/* Kiểm tra xem gallery có phải là chuỗi JSON hợp lệ không */}
                  {(() => {
                    try {
                      // Kiểm tra nếu giá trị là một chuỗi JSON hợp lệ
                      const images =
                        tintuc.gallery.startsWith("[") &&
                        tintuc.gallery.endsWith("]")
                          ? JSON.parse(tintuc.gallery)
                          : [tintuc.gallery]; // Nếu không phải mảng JSON, coi như 1 ảnh duy nhất

                      if (Array.isArray(images) && images.length > 1) {
                        return <span>Nhiều ảnh</span>; // Hiển thị "Nhiều ảnh" nếu có hơn một ảnh
                      } else if (Array.isArray(images) && images.length === 1) {
                        return (
                          <img src={images[0]} alt="Ảnh phụ" width="50px" />
                        );
                      }
                    } catch (e) {
                      console.error("Lỗi khi phân tích gallery:", e);
                      return null;
                    }
                  })()}
                </td>

                <td className="py-3 px-4 text-sm text-center text-gray-800">
                  {tintuc.content}
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-800">
                  {tintuc.created_at}
                </td>
                <td className="py-3 px-4 text-sm text-center flex">
                  <button>
                    <Link
                      to={`/admin/${tintuc.id}`}
                      className="ml-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      View
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDelete(tintuc.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
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

export default TintucList;
